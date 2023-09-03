import { BoundingBox, Vec2, type Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { Entity } from '../../index.js';
import type { ScreenPosition, WorldPosition } from '../../renderer/position.type.js';
import type { CameraFollowSystemOptions } from '../../system/prebuilt/camera-follow.system.options.js';
import { Component } from '../component.class.js';
import type { CameraOptions } from './camera.component.options.js';
import { PositionComponent } from './position.component.js';

export type Axis = 'x' | 'y';

export class CameraComponent extends Component {
	screenViewport = BoundingBox.fromSize(new Vec2(10, 10));
	worldViewport = BoundingBox.fromSize(new Vec2(10, 10));

	private positionComponent!: PositionComponent;

	options: CameraOptions;

	constructor(rawOptions?: CameraOptions) {
		super();
		this.options = { movable: true, ...rawOptions };
	}

	override onSpawn(): void {
		const positionComponent = this.belongsTo[0]?.getComponent(PositionComponent);
		if (positionComponent) {
			this.positionComponent = positionComponent;
		} else {
			throw new Error('Trying to spawn a camera without a PositionComponent');
		}

		this.positionComponent.onMove((position) => {
			this.worldViewport.moveTopLeftTo(position);
		});
	}

	setFollowOptions(followOptions: CameraFollowSystemOptions): void {
		this.options = { movable: this.options.movable, ...followOptions };
	}

	updateFollowOptions(followOptions: Partial<CameraFollowSystemOptions>): void {
		this.options = { ...this.options, ...followOptions };
	}

	followEntity(entity: Entity): void {
		this.options.entity = entity;
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

	getScreenBoxFromWorldBox(worldBox: BoundingBox): BoundingBox {
		return BoundingBox.fromVectors([
			this.getScreenPositionFromWorldPosition(worldBox.topLeft),
			this.getScreenPositionFromWorldPosition(worldBox.bottomRight),
		]);
	}

	getWorldBoxFromScreenBox(screenBox: BoundingBox): BoundingBox {
		return BoundingBox.fromVectors([
			this.getWorldPositionFromScreenPosition(screenBox.topLeft),
			this.getWorldPositionFromScreenPosition(screenBox.bottomRight),
		]);
	}

	getScreenPositionFromWorldPosition(gamePosition: WorldPosition): ScreenPosition {
		return gamePosition.sub(this.worldAnchor);
	}

	getWorldPositionFromScreenPosition(screenPosition: ScreenPosition): WorldPosition {
		return screenPosition.add(this.worldAnchor);
	}

	screenCenter(): ScreenPosition {
		return this.screenViewport.center;
	}

	lookingAt(): WorldPosition {
		return this.worldViewport.center;
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

	move(offset: Vec2Like): void {
		this.positionComponent.move(offset);
	}
}
