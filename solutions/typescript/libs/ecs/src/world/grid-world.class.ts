import {
	BoundingBox,
	arrayContains,
	filterMap,
	hzToMs,
	type Constructor,
	type InstanceTypeOfConstructorTuple,
	type Vec2Like,
} from '@alexaegis/advent-of-code-lib';
import type { ComponentFilterTypeOfTuple } from '../components/component-filter.interface.js';
import type { Component } from '../components/component.class.js';
import { Entity, type EntityId } from '../entity/index.js';
import { spawnCamera } from '../entity/prebuilt/camera.entity.js';
import { IntervalExecutor } from '../executor/interval-executor.class.js';
import { StepperExecutor } from '../executor/stepper-executor.class.js';
import {
	AsciiDisplayComponent,
	CameraComponent,
	ColliderComponent,
	Executor,
	UntilHaltExecutor,
} from '../index.js';
import { BlessedIOBackend } from '../renderer/backend/blessed-io-backend.class.js';
import { TerminalKitIOBackend } from '../renderer/backend/terminal-kit-io-backend.class.js';
import { ConsoleLogIOBackend, type IOBackend } from '../renderer/index.js';
import { RendererSystem } from '../renderer/renderer.system.js';
import { System, type SystemLike } from '../system/system.type.js';
import {
	normalizeGridWorldOptions,
	type GridWorldOptions,
	type NormalizedGridWorldOptions,
} from './grid-world.class.options.js';
import type { SpatialCache } from './spatial-cache.class.js';
import type { TimeData } from './time-data.interface.js';

export const defaultGridWorldAocOptions: GridWorldOptions = {
	executorSpeed: process.env['RUN'] ? 60 : 'instant',
	executorHaltCondition: 'untilSettled',
	io: process.env['RUN'] ? 'terminalKit' : undefined,
};

export class GridWorld {
	private readonly options: NormalizedGridWorldOptions;

	public readonly entities = new Map<EntityId, Entity>();
	public readonly components = new Map<Constructor<Component>, Component[]>();
	public readonly systems: System[] = [];

	/**
	 * Any component that can be cached spacially will be cached here with relation
	 * to the PositionComponent. Any other component that defines an Area
	 * will be cached here and updated as the PositionComponent is updated.
	 */
	public readonly componentSpatialCache = new Map<Constructor<Component>, SpatialCache>();

	/**
	 * If one was added, it's reference is made easily accessible
	 */
	private rendererSystem?: RendererSystem;
	private _io?: IOBackend;

	private _systemsInitialized = false;

	private _lastFrameTime = 0;
	private _timeData: TimeData = {
		time: 0,
		tick: 0,
		deltaTime: 0,
	};

	private _ticksDoingNothing = 0;
	private _systemsSettledAtTick: number | undefined = undefined;
	private _executor?: Executor;

	private nextEntityId = 0;

	constructor(options: GridWorldOptions = defaultGridWorldAocOptions) {
		this.options = normalizeGridWorldOptions(options);

		if (this.options.executorSpeed === 'stepper') {
			this._executor = new StepperExecutor(this, this.options.executorHaltCondition);
		} else if (this.options.executorSpeed === 'instant') {
			this._executor = new UntilHaltExecutor(this, this.options.executorHaltCondition);
		} else {
			this._executor = new IntervalExecutor(
				this,
				this.options.executorHaltCondition,
				hzToMs(this.options.executorSpeed),
			);
		}

		switch (this.options.io) {
			case 'terminalKit': {
				this._io = new TerminalKitIOBackend();

				break;
			}
			case 'blessed': {
				this._io = new BlessedIOBackend();

				break;
			}
			case 'console': {
				this._io = new ConsoleLogIOBackend();

				break;
			}
			// No default
		}

		if (this._io) {
			const cameraEntity = spawnCamera(this, this.options.cameraOptions);
			if (!this.rendererSystem) {
				this.addSystem(
					new RendererSystem({
						...this.options.rendererOptions,
						cameraEntity,
						backend: this._io,
					}),
				);
			}
		}
	}

	halt(): void {
		this.executor?.halt();
	}

	getVisibleEntityBoundingBox(): BoundingBox {
		return AsciiDisplayComponent.getSpatialCache(
			this,
			AsciiDisplayComponent,
		).areaOfAllNonInfiniteEntities();
	}

	getCollidingEntityBoundingBox(): BoundingBox {
		return ColliderComponent.getSpatialCache(
			this,
			AsciiDisplayComponent,
		).areaOfAllNonInfiniteEntities();
	}

	centerCameraOnEntity(entity: Entity): void {
		try {
			const [, camera] = this.queryOne(CameraComponent);
			const entityCenter = entity.getCenterPosition();
			if (entityCenter) {
				camera.centerOn(entityCenter);
			}
		} catch {
			return;
		}
	}

	centerCameraOnEntities(): void {
		try {
			const [, camera] = this.queryOne(CameraComponent);
			const entityBoundingBox = this.getVisibleEntityBoundingBox();
			camera.centerOn(entityBoundingBox.center);
		} catch {
			return;
		}
	}

	entitiesVisibleAt(position: Vec2Like): Entity[] {
		return AsciiDisplayComponent.getSpatialCache(this, AsciiDisplayComponent).get(position);
	}

	entitiesCollidingAt(position: Vec2Like): Entity[] {
		return ColliderComponent.getSpatialCache(this, ColliderComponent).get(position);
	}

	addSystem(systemLike: SystemLike): void {
		if (systemLike instanceof RendererSystem) {
			this.rendererSystem = systemLike;
		}

		const system =
			typeof systemLike === 'function'
				? { init: () => undefined, tick: systemLike }
				: systemLike;
		this.systems.push(system);
	}

	async run(): Promise<number> {
		return this._executor ? await this._executor.run() : this.timeData.tick;
	}

	async initializeSystems(): Promise<void> {
		if (!this._systemsInitialized) {
			await Promise.all(
				this.systems
					.filter((system): system is System => system instanceof System)
					.map((system) => system.init(this)),
			);
			this._systemsInitialized = true;
			this._timeData.time = performance.now();
		}
	}

	tick(): number {
		if (!this._systemsInitialized) {
			throw new Error('Trying to advance world state when systems are not initialized!');
		}

		const now = performance.now();
		this._timeData.deltaTime = now - this._timeData.time;
		this._timeData.time = now;
		this._timeData.tick += 1;

		let mutated = false;
		for (const system of this.systems) {
			const systemMutated = system.tick(this, this._timeData) ?? false;
			mutated = mutated || systemMutated;
		}

		this._ticksDoingNothing = mutated ? 0 : this._ticksDoingNothing + 1;

		if (this._systemsSettledAtTick === undefined && this._ticksDoingNothing >= 2) {
			this._systemsSettledAtTick = this._timeData.tick;
		}

		this._lastFrameTime = performance.now() - now;
		return this._timeData.tick;
	}

	get timeData(): Readonly<TimeData> {
		return this._timeData;
	}

	get lastFrameTime(): number {
		return this._lastFrameTime;
	}

	get systemsSettled(): boolean {
		return this._systemsSettledAtTick === undefined
			? false
			: this._systemsSettledAtTick <= this.timeData.tick;
	}

	get io(): IOBackend | undefined {
		return this._io;
	}

	get executor(): Executor | undefined {
		return this._executor;
	}

	spawn(...components: Component[]): Entity {
		const entity = new Entity(this, this.nextEntityId);

		for (const component of components) {
			this.attachComponent(entity, component);
		}
		this.entities.set(entity.entityId, entity);
		for (const component of entity.components.values()) {
			component.onSpawn();
		}
		entity.spawned = true;
		this.nextEntityId += 1;
		return entity;
	}

	attachComponent(entity: Entity, component: Component): void {
		component.world = this;
		entity.components.set(component.componentType(), component);

		if (!arrayContains(component.belongsTo, entity)) {
			component.belongsTo.push(entity);
		}

		const comps = this.components.get(component.componentType()) ?? [];
		comps.push(component);
		this.components.set(component.componentType(), comps);
	}

	deattachComponent(entity: Entity, component: Component): void {
		// Deattach from entity
		entity.components.delete(component.componentType());
		component.belongsTo.removeItem(entity);
		// If it's not attached to anything remove from the componentMap
		if (component.belongsTo.length === 0) {
			this.components.get(component.componentType())?.removeItem(component);
		}
	}

	despawn(entity: Entity): void {
		this.entities.delete(entity.entityId);
		for (const component of entity.components.values()) {
			this.deattachComponent(entity, component);
		}
		entity.spawned = false;
	}

	getSingletonComponent<C extends Component>(componentType: Constructor<C>): C {
		const component = this.getComponentsByType(componentType);

		if (component.length === 1) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			return component[0]!;
		} else if (component.length === 0) {
			throw new Error(
				`[getSingletonComponent] no entity exists with component ${String(componentType)}`,
			);
		} else {
			throw new Error(
				`[getSingletonComponent] more than one entity exists with component ${String(
					componentType,
				)}`,
			);
		}
	}

	getComponentsByType<C extends Component>(componentType: Constructor<C>): C[] {
		return (this.components.get(componentType) as C[] | undefined) ?? [];
	}

	getCamera(): CameraComponent {
		return this.queryOne(CameraComponent)[1];
	}

	followWithCamera(entity: Entity): void {
		const camera = this.getCamera();
		camera.followEntity(entity);
	}

	/**
	 * ? Type is not correctly inferred within filter objects
	 * @param componentFilters
	 * @returns
	 */
	filter<C extends Constructor<Component>[]>(
		...componentFilters: ComponentFilterTypeOfTuple<InstanceTypeOfConstructorTuple<C>>
	): [Entity, ...InstanceTypeOfConstructorTuple<C>][] {
		return filterMap(this.entities.values(), (entity) => {
			const matchingComponents = filterMap(componentFilters, (componentFilter) => {
				const component = entity.components.get(componentFilter.componentType);
				return component ? componentFilter.filter(component) : false;
			}) as InstanceTypeOfConstructorTuple<C>;
			return matchingComponents.length > 0 ? [entity, ...matchingComponents] : undefined;
		});
	}

	query<C extends Constructor<Component>[]>(
		...componentTypes: C
	): [Entity, ...InstanceTypeOfConstructorTuple<C>][] {
		const firstComponentType = componentTypes[0];
		if (firstComponentType) {
			const entities = this.getComponentsByType(firstComponentType).reduce(
				(acc, component) => {
					for (const belongingEntity of component.belongsTo) {
						acc.add(belongingEntity);
					}
					return acc;
				},
				new Set<Entity>(),
			);
			return filterMap(entities, (entity) => {
				const matchingComponents = componentTypes.map((componentType) =>
					entity.components.get(componentType),
				) as InstanceTypeOfConstructorTuple<C>;
				return matchingComponents.every((component) => !!component)
					? [entity, ...matchingComponents]
					: undefined;
			});
		} else {
			return [];
		}
	}

	queryOne<C extends Constructor<Component>[]>(
		...componentTypes: C
	): [Entity, ...InstanceTypeOfConstructorTuple<C>] {
		const firstComponentType = componentTypes[0];
		if (firstComponentType) {
			const entities = this.getComponentsByType(firstComponentType).reduce(
				(acc, component) => {
					for (const belongingEntity of component.belongsTo) {
						acc.add(belongingEntity);
					}
					return acc;
				},
				new Set<Entity>(),
			);

			for (const entity of entities) {
				const matchingComponents = componentTypes.map((componentType) =>
					entity.components.get(componentType),
				) as InstanceTypeOfConstructorTuple<C>;
				if (matchingComponents.every((component) => !!component)) {
					return [entity, ...matchingComponents];
				}
			}
		}

		throw new Error(
			`Cannot find an entity with components: ${componentTypes
				.map((t) => t.name)
				.join(', ')}`,
		);
	}

	print(): void {
		this.rendererSystem?.printCurrentFrame();
	}
}
