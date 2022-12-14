import {
	BoundingBox,
	filterMap,
	renderMatrix,
	Vec2,
	Vec2Like,
	Vec2String,
} from '@alexaegis/advent-of-code-lib';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Constructor<T> = abstract new (...args: any[]) => T;

export type InstanceTypeOfConstructorTuple<C extends Constructor<unknown>[]> = {
	[K in keyof C]: C[K] extends C[number] ? InstanceType<C[K]> : never;
};

export type ComponentFilterFn<C extends Component> = (component: C) => boolean;
export interface ComponentFilter<C extends Component> {
	componentType: Constructor<C>;
	filter: ComponentFilterFn<C>;
}

export type ComponentFilterTypeOfTuple<C extends Component[]> = {
	[K in keyof C]: C[K] extends C[number] ? ComponentFilter<C[K]> : never;
};

export type ComponentFilterFnTypeOfTuple<C extends Component[]> = {
	[K in keyof C]: C[K] extends C[number] ? ComponentFilterFn<C[K]> : never;
};

export abstract class Component {
	belongsTo: Entity[] = [];
	_world: GridWorld | undefined;

	is<C extends Component>(component: Constructor<C>): boolean {
		return this instanceof component;
	}

	world(): GridWorld {
		if (this._world) {
			return this._world;
		} else {
			throw new Error('Component is not attached to any world');
		}
	}

	attachWorld(world: GridWorld): void {
		this._world = world;
	}

	componentType(): Constructor<this> {
		return Object.getPrototypeOf(this).constructor as Constructor<this>;
	}

	componentName(): string {
		return this.componentType().name;
	}
}

export class MetadataKindComponent extends Component {}

export class NameComponent extends Component {
	constructor(public name: string) {
		super();
	}
}

export class AsciiDisplayComponent extends Component {
	constructor(public displayChar: string) {
		super();
	}
}

export class AnyPositionComponent extends Component {
	constructor(public readonly position: Vec2) {
		super();
	}

	attachWorld(world: GridWorld): void {
		super.attachWorld(world);
		const position = this.position.toString();
		for (const entity of this.belongsTo) {
			world.indexEntityAddedToPosition(entity, position);
		}
	}
}

export class PositionComponent extends AnyPositionComponent {
	move(offset: Vec2Like): boolean {
		const sourcePosition = this.position.toString();
		const targetPosition = this.position.add(offset).toString();
		const world = this.world();
		const entitiesAtTarget = world.getEntitiesByPosition(targetPosition);

		// Right now it can't move to occupied spaces but a collider fn can be added later
		if (entitiesAtTarget.length === 0) {
			this.position.addMut(offset);
			for (const entity of this.belongsTo) {
				world.indexEntityPositionMove(entity, sourcePosition, targetPosition);
			}
			return true;
		} else {
			return false;
		}
	}
}

/**
 * Signals that the entity it's attached to is immutable.
 * Components with this are always rendered first
 */
export class StaticPositionComponent extends AnyPositionComponent {}

export class Entity {
	constructor(private readonly world: GridWorld, public entityId: number) {}

	components = new Map<Constructor<Component>, Component>();

	getComponent<C extends Component>(componentType: Constructor<C>): C | undefined {
		return this.components.get(componentType) as C | undefined;
	}

	despawn(): void {
		this.world.despawn(this);
	}

	freezePosition(): void {
		const positionComponent = this.getComponent(PositionComponent);
		if (positionComponent) {
			this.world.deattachComponent(this, positionComponent);
			this.world.attachComponent(
				this,
				new StaticPositionComponent(positionComponent.position.clone())
			);
		}
	}
}

const shiftPositionToViewport = (position: Vec2, viewport: BoundingBox): Vec2 => {
	return viewport.topLeft.subtract(position);
};

/**
 * Systems should return if they did something to the world or not, so the
 * world can halt once all systems settled
 */
export type System = (world: GridWorld) => boolean;

export class GridWorld {
	entities = new Set<Entity>();
	components = new Map<Constructor<Component>, Component[]>();
	private readonly _entitiesByPosition = new Map<Vec2String, Entity[]>();

	entityBoundingBox = new BoundingBox(new Vec2(0, 0), new Vec2(0, 0));

	viewport = new BoundingBox(new Vec2(0, 0), new Vec2(10, 10));

	systems: System[] = [];

	time = 0;
	_systemsSettled = false;

	nextEntityId = 0;

	getEntitiesByPosition(position: Vec2Like | Vec2String): Entity[] {
		return this._entitiesByPosition.get(Vec2.toString(position)) ?? [];
	}

	indexEntityPositionMove(
		entity: Entity,
		fromPosition: Vec2Like | Vec2String,
		toPosition: Vec2Like | Vec2String
	): void {
		this.indexEntityRemovedFromPosition(entity, fromPosition);
		this.indexEntityAddedToPosition(entity, toPosition);
	}

	indexEntityRemovedFromPosition(entity: Entity, position: Vec2Like | Vec2String): void {
		const entitiesThere = this.getEntitiesByPosition(position);
		if (entitiesThere.has(entity)) {
			entitiesThere.removeItem(entity);
		}
	}

	indexEntityAddedToPosition(entity: Entity, position: Vec2Like | Vec2String): void {
		const entitiesThere = this.getEntitiesByPosition(position);
		if (!entitiesThere.has(entity)) {
			entitiesThere.push(entity);
			this._entitiesByPosition.set(
				typeof position === 'string' ? position : Vec2.toString(position),
				entitiesThere
			);
		}
	}

	addSystem(system: System): void {
		this.systems.push(system);
	}

	tick(): number {
		this._systemsSettled = this.systems
			.map((system) => system(this))
			.every((didSomething) => !didSomething);
		this.time += 1;
		return this.time;
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

	attachComponent(entity: Entity, component: Component): void {
		entity.components.set(component.componentType(), component);
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

	setViewport(viewport: BoundingBox): void {
		this.viewport = viewport;
	}

	calculateEntityBoundingBox(): void {
		this.entityBoundingBox = new BoundingBox(
			...this.getComponentsByType(StaticPositionComponent).map((entity) => entity.position),
			...this.getComponentsByType(PositionComponent).map((entity) => entity.position)
		);
	}

	focusViewportToEntities(): void {
		this.viewport = new BoundingBox(
			this.entityBoundingBox.bottomRight,
			this.entityBoundingBox.topLeft
		);
		this.viewport.extend(1);
	}

	render(autoViewport = false): string {
		if (autoViewport) {
			this.calculateEntityBoundingBox();
			this.focusViewportToEntities();
		}

		const matrix: string[][] = [];

		for (let y = this.viewport.topLeft.y; y <= this.viewport.bottomRight.y; y++) {
			const row: string[] = [];
			for (let x = this.viewport.topLeft.x; x <= this.viewport.bottomRight.x; x++) {
				row.push('.');
			}
			matrix.push(row);
		}

		for (const [_entity, positionComponent, displayComponent] of [
			...this.query(StaticPositionComponent, AsciiDisplayComponent),
			...this.query(PositionComponent, AsciiDisplayComponent),
		]) {
			const viewPosition = shiftPositionToViewport(positionComponent.position, this.viewport);
			if (
				viewPosition.x >= 0 &&
				viewPosition.x <= this.viewport.size.x &&
				viewPosition.y >= 0 &&
				viewPosition.y <= this.viewport.size.y
			) {
				matrix[viewPosition.y][viewPosition.x] = displayComponent.displayChar;
			}
		}

		return renderMatrix(matrix);
	}

	print(autoViewport?: boolean): void {
		console.log(this.render(autoViewport));
	}
}
