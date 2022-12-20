import type { Constructor } from '@alexaegis/advent-of-code-lib';
import type { Component } from '../components/component.class.js';
import {
	PositionComponent,
	StaticPositionComponent,
} from '../components/prebuilt/position.component.js';
import type { GridWorld } from '../grid-world.class.js';

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
