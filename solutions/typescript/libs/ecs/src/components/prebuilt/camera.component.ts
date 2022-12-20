import { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../../grid-world.class.js';
import type { ScreenPosition, WorldPosition } from '../../renderer/position.type.js';
import { Component } from '../component.class.js';
import { PositionComponent, StaticPositionComponent } from './position.component.js';

export type Axis = 'x' | 'y';

export class CameraComponent extends Component {
	screenViewport = BoundingBox.fromVectors(Vec2.ORIGIN);
	worldViewport = BoundingBox.fromVectors(Vec2.ORIGIN);

	private entityBoundingBox = BoundingBox.fromVectors(Vec2.ORIGIN);

	get worldAnchor(): Vec2 {
		return this.screenViewport.topLeft.clone();
	}

	get size(): Vec2 {
		return this.screenViewport.size.clone();
	}

	focusViewportToEntities(): void {
		this.entityBoundingBox.clone();
		this.screenViewport.pad(1);
	}

	calculateEntityBoundingBox(world: GridWorld): void {
		this.entityBoundingBox = new BoundingBox(
			world
				.getComponentsByType(StaticPositionComponent)
				.map((entity) => entity.position)
				.concat(
					world.getComponentsByType(PositionComponent).map((entity) => entity.position)
				)
		);
	}

	getScreenPositionFromWorldPosition(gamePosition: WorldPosition): ScreenPosition {
		return gamePosition.sub(this.worldAnchor).applyChange((n) => Math.max(n, 0));
	}

	getWorldPositionFromScreenPosition(screen: ScreenPosition): WorldPosition {
		return this.worldAnchor.sub(screen);
	}

	screenCenter(): ScreenPosition {
		return this.size.clone().applyChange((n) => Math.floor(n / 2));
	}

	entityCenter(): WorldPosition {
		return this.entityBoundingBox.center;
	}

	getScreenspaceBoundingBox(): BoundingBox {
		return BoundingBox.fromVectors(Vec2.ORIGIN, this.size);
	}

	getGamespaceBoundingBox(): BoundingBox {
		return BoundingBox.fromVectors(this.worldAnchor, this.worldAnchor.add(this.size));
	}

	focus(on: WorldPosition): void {
		this.screenViewport.offset(on.sub(this.screenCenter()));
		this.worldViewport.offset(on);
	}
}
