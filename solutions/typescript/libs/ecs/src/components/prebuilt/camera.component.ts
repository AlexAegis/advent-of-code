import { BoundingBox, Vec2, Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { ScreenPosition, WorldPosition } from '../../renderer/position.type.js';
import { Component } from '../component.class.js';
import { PositionComponent } from './position.component.js';

export type Axis = 'x' | 'y';

export class CameraComponent extends Component {
	screenViewport = BoundingBox.fromSize(new Vec2(10, 10));
	worldViewport = BoundingBox.fromSize(new Vec2(10, 10));

	private positionComponent!: PositionComponent;

	override onSpawn(): void {
		const positionComponent = this.belongsTo[0].getComponent(PositionComponent);
		if (positionComponent) {
			this.positionComponent = positionComponent;
		} else {
			throw new Error('Trying to spawn a camera without a PositionComponent');
		}

		this.positionComponent.onMove((position) => {
			this.worldViewport.moveTopLeftTo(position);
		});
	}

	get worldAnchor(): Readonly<Vec2> {
		return this.worldViewport.topLeft;
	}

	get size(): Vec2 {
		return this.screenViewport.size.clone();
	}

	get position(): Vec2 {
		return this.positionComponent.position;
	}

	resize(size: Vec2Like): void {
		this.worldViewport.resizeFromTopleft(size);
		this.screenViewport.resizeFromTopleft(size);
	}

	getScreenPositionFromWorldPosition(gamePosition: WorldPosition): ScreenPosition {
		return gamePosition.sub(this.worldAnchor);
	}

	getWorldPositionFromScreenPosition(screenPosition: ScreenPosition): WorldPosition {
		return screenPosition.add(this.worldAnchor);
	}

	screenCenter(): ScreenPosition {
		return this.size.clone().applyChange((n) => Math.floor(n / 2));
	}

	lookingAt(): WorldPosition {
		return this.getWorldPositionFromScreenPosition(this.screenCenter());
	}

	getScreenspaceBoundingBox(): Readonly<BoundingBox> {
		return this.screenViewport;
	}

	getGamespaceBoundingBox(): Readonly<BoundingBox> {
		return this.worldViewport;
	}

	centerOn(on: WorldPosition): void {
		this.positionComponent.moveTo(on.sub(this.screenCenter()));
	}
}
