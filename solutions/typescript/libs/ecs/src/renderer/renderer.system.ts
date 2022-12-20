import { renderMatrix } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../components/prebuilt/ascii-display.component.js';
import { CameraComponent } from '../components/prebuilt/camera.component.js';
import {
	PositionComponent,
	StaticPositionComponent,
} from '../components/prebuilt/position.component.js';
import type { Entity } from '../entity/entity.class.js';
import type { GridWorld } from '../grid-world.class.js';
import { System } from '../system/system.type.js';
import type { RendererBackend } from './backend/renderer-backend.class.js';
import { Sprite } from './sprite.class.js';

export class RendererSystem extends System {
	order = Infinity;
	cameraEntity?: Entity;
	camera?: CameraComponent;
	lastFrame?: Sprite;
	currentFrame?: Sprite;

	backend: RendererBackend;

	constructor(rendererBackend: RendererBackend) {
		super();
		this.backend = rendererBackend;
	}

	tick(world: GridWorld): boolean {
		// Find the camera if it's not set
		if (!this.camera) {
			// Will error out if no camera is found.
			const [cameraEntity, cameraComponent] = world.queryOne(CameraComponent);
			this.cameraEntity = cameraEntity;
			this.camera = cameraComponent;
		}

		this.lastFrame = this.currentFrame;
		this.currentFrame = this.render(world);
		this.backend.pushFrame(this.currentFrame);
		return false;
	}

	render(world: GridWorld): Sprite {
		const frame: Sprite = new Sprite();
		if (!this.camera) {
			return frame;
		}
		frame.blank(this.camera.screenViewport);

		for (const [_entity, positionComponent, displayComponent] of [
			...world.query(StaticPositionComponent, AsciiDisplayComponent),
			...world.query(PositionComponent, AsciiDisplayComponent),
		]) {
			const screenPosition = this.camera.getScreenPositionFromWorldPosition(
				positionComponent.position
			);

			const entityRender = displayComponent.render;

			const entityScreenBox = entityRender.boundingBox.clone().moveTopLeftTo(screenPosition);

			if (this.camera.screenViewport.intersects(entityScreenBox)) {
				for (let y = 0; y < entityRender.matrix.length; y++) {
					if (this.camera.screenViewport.vertical.contains(y)) {
						const displayRow = frame.matrix[screenPosition.y + y];
						const entityRenderRow = entityRender.matrix[y];
						if (displayRow) {
							for (let x = 0; x < entityRenderRow.length; x++) {
								if (this.camera.screenViewport.horizontal.contains(x)) {
									displayRow[screenPosition.x + x] = entityRenderRow[x];
								}
							}
						}
					}
				}
			}
		}

		return frame;
	}

	printCurrentFrame(): void {
		if (this.currentFrame) {
			const render = renderMatrix(this.currentFrame.matrix);
			console.log(render);
		}
	}
}
