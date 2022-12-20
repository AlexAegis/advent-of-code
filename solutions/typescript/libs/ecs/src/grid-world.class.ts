import {
	Constructor,
	filterMap,
	InstanceTypeOfConstructorTuple,
	Vec2,
	Vec2Like,
	Vec2String,
} from '@alexaegis/advent-of-code-lib';
import type { ComponentFilterTypeOfTuple } from './components/component-filter.interface.js';
import type { Component } from './components/component.class.js';
import { CameraComponent } from './components/prebuilt/camera.component.js';
import {
	EntityPositionUpdater,
	PositionComponent,
	StaticPositionComponent,
} from './components/prebuilt/position.component.js';
import { Entity } from './entity/index.js';
import { GridWorldOptions, normalizeGridWorldOptions } from './grid-world.class.options.js';
import { TerminalKitRendererBackend } from './renderer/backend/terminal-kit-renderer-backend.class.js';
import { RendererSystem } from './renderer/renderer.system.js';
import type { SystemLike } from './system/system.type.js';

export class GridWorld {
	private readonly options: Required<GridWorldOptions>;

	public readonly entities = new Set<Entity>();
	public readonly components = new Map<Constructor<Component>, Component[]>();
	public readonly systems: SystemLike[] = [];

	private readonly _entitiesByPosition = new Map<Vec2String, Entity[]>();

	/**
	 * If one was added, it's reference is made easily accessible
	 */
	private rendererSystem?: RendererSystem;

	private _time = 0;
	private _systemsSettled = false;
	private nextEntityId = 0;

	constructor(options?: GridWorldOptions) {
		this.options = normalizeGridWorldOptions(options);
	}

	getEntitiesByPosition(position: Vec2Like | Vec2String): Entity[] {
		return this._entitiesByPosition.get(Vec2.toString(position)) ?? [];
	}

	private indexEntityPositionMove(
		entity: Entity,
		fromPosition: Vec2Like | Vec2String | undefined,
		toPosition: Vec2Like | Vec2String
	): void {
		if (fromPosition) {
			this.indexEntityRemovedFromPosition(entity, fromPosition);
		}
		this.indexEntityAddedToPosition(entity, toPosition);
	}

	private indexEntityRemovedFromPosition(entity: Entity, position: Vec2Like | Vec2String): void {
		const entitiesThere = this.getEntitiesByPosition(position);
		if (entitiesThere.has(entity)) {
			entitiesThere.removeItem(entity);
		}
	}

	private indexEntityAddedToPosition(entity: Entity, position: Vec2Like | Vec2String): void {
		const entitiesThere = this.getEntitiesByPosition(position);
		if (!entitiesThere.has(entity)) {
			entitiesThere.push(entity);
			this._entitiesByPosition.set(
				typeof position === 'string' ? position : Vec2.toString(position),
				entitiesThere
			);
		}
	}

	addSystem(system: SystemLike): void {
		if (system instanceof RendererSystem) {
			this.rendererSystem = system;
		}
		this.systems.push(system);
	}

	tick(): number {
		this._systemsSettled = this.systems
			.map((system) => (typeof system === 'function' ? system(this) : system.tick(this)))
			.every((didSomething) => !didSomething);
		this._time += 1;
		return this._time;
	}

	get time(): number {
		return this._time;
	}

	get systemsSettled(): boolean {
		return this._systemsSettled;
	}

	spawn(...components: Component[]): Entity {
		const entity = new Entity(this, this.nextEntityId);

		for (const component of components) {
			this.attachComponent(entity, component);
		}
		this.entities.add(entity);
		this.nextEntityId += 1;
		return entity;
	}

	private createPositionUpdater(entity: Entity): EntityPositionUpdater {
		return (from, to) => this.indexEntityPositionMove(entity, from, to);
	}

	attachComponent(entity: Entity, component: Component): void {
		entity.components.set(component.componentType(), component);

		if (
			component instanceof PositionComponent ||
			component instanceof StaticPositionComponent
		) {
			component.registerPositionUpdater(this.createPositionUpdater(entity));
		}

		if (!component.belongsTo.has(entity)) {
			component.belongsTo.push(entity);
		}

		const comps = this.components.get(component.componentType()) ?? [];
		comps.push(component);
		component.attachWorld(this);
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

	entitiesAt(position: Vec2Like): Entity[] {
		return [
			...this.getComponentsByType(StaticPositionComponent),
			...this.getComponentsByType(PositionComponent),
		]
			.filter((p) => p.position.equals(position))
			.flatMap((c) => c.belongsTo);
	}

	despawn(entity: Entity): void {
		this.entities.delete(entity);
		for (const component of entity.components.values()) {
			this.deattachComponent(entity, component);
		}
	}

	getSingletonComponent<C extends Component>(componentType: Constructor<C>): C {
		const component = this.getComponentsByType(componentType);

		if (component.length === 1) {
			return component[0];
		} else if (component.length === 0) {
			throw new Error(
				`[getSingletonComponent] no entity exists with component ${componentType}`
			);
		} else {
			throw new Error(
				`[getSingletonComponent] more than one entity exists with component ${componentType}`
			);
		}
	}

	getComponentsByType<C extends Component>(componentType: Constructor<C>): C[] {
		return (this.components.get(componentType) as C[]) ?? [];
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
				if (component) {
					return componentFilter.filter(component);
				} else {
					return false;
				}
			}) as InstanceTypeOfConstructorTuple<C>;
			if (matchingComponents.length > 0) {
				return [entity, ...matchingComponents];
			} else {
				return undefined;
			}
		});
	}

	query<C extends Constructor<Component>[]>(
		...componentTypes: C
	): [Entity, ...InstanceTypeOfConstructorTuple<C>][] {
		const entities = this.getComponentsByType(componentTypes[0]).reduce((acc, e) => {
			for (const belongingEntity of e.belongsTo) {
				acc.add(belongingEntity);
			}
			return acc;
		}, new Set<Entity>());
		return filterMap(entities, (entity) => {
			const matchingComponents = componentTypes.map((componentType) =>
				entity.components.get(componentType)
			) as InstanceTypeOfConstructorTuple<C>;
			if (matchingComponents.every((component) => !!component)) {
				return [entity, ...matchingComponents];
			} else {
				return undefined;
			}
		});
	}

	queryOne<C extends Constructor<Component>[]>(
		...componentTypes: C
	): [Entity, ...InstanceTypeOfConstructorTuple<C>] {
		const entities = this.getComponentsByType(componentTypes[0]).reduce((acc, e) => {
			for (const belongingEntity of e.belongsTo) {
				acc.add(belongingEntity);
			}
			return acc;
		}, new Set<Entity>());

		for (const entity of entities) {
			const matchingComponents = componentTypes.map((componentType) =>
				entity.components.get(componentType)
			) as InstanceTypeOfConstructorTuple<C>;
			if (matchingComponents.every((component) => !!component)) {
				return [entity, ...matchingComponents];
			}
		}

		throw new Error(
			`Cannot find an entity with components: ${componentTypes.map((t) => t.name).join(', ')}`
		);
	}

	createDefaultCameraAndRenderer(): void {
		if (this.getComponentsByType(CameraComponent).length === 0) {
			this.spawn(new CameraComponent());
		}

		if (!this.rendererSystem) {
			this.addSystem(new RendererSystem(new TerminalKitRendererBackend()));
		}
	}

	print(): void {
		this.rendererSystem?.printCurrentFrame();
	}
}
