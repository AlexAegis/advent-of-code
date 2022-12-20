import type { Vec2, Vec2Like, Vec2String } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../../grid-world.class.js';
import { Component } from '../component.class.js';

export type EntityPositionUpdater = (
	from: Vec2Like | Vec2String | undefined,
	to: Vec2Like | Vec2String
) => void;
export class AnyPositionComponent extends Component {
	protected entityPositionUpdater?: EntityPositionUpdater;

	constructor(public readonly position: Vec2) {
		super();
	}

	registerPositionUpdater(entityPositionUpdater: EntityPositionUpdater): void {
		this.entityPositionUpdater = entityPositionUpdater;
	}

	attachWorld(world: GridWorld): void {
		super.attachWorld(world);
		this.entityPositionUpdater?.(undefined, this.position);
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
			this.entityPositionUpdater?.(sourcePosition, targetPosition);
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
