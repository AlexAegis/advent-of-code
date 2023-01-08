import type { Constructor, Vec2 } from '@alexaegis/advent-of-code-lib';
import type { Component } from '../components/component.class.js';
import { AsciiDisplayComponent } from '../components/prebuilt/ascii-display.component.js';
import {
	PositionComponent,
	StaticPositionComponent,
} from '../components/prebuilt/position.component.js';
import type { GridWorld } from '../world/grid-world.class.js';

export type EntityId = number;

export class Entity {
	spawned = false;
	constructor(private readonly world: GridWorld, public entityId: EntityId) {}

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

	/**
	 * Takes the displayComponent into account when available.
	 */
	getCenterPosition(): Vec2 | undefined {
		const positionComponent = this.getComponent(PositionComponent);

		if (!positionComponent) {
			return undefined;
		}

		let entityPosition = positionComponent.position;

		const displayComponent = this.getComponent(AsciiDisplayComponent);
		if (displayComponent?.sprite.boundingBox) {
			entityPosition = entityPosition.add(displayComponent?.sprite.boundingBox.center);
		}

		return entityPosition;
	}
}
