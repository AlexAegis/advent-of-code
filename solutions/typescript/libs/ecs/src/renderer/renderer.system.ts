import { renderMatrix } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../components/prebuilt/ascii-display.component.js';
import { CameraComponent } from '../components/prebuilt/camera.component.js';
import {
	PositionComponent,
	StaticPositionComponent,
} from '../components/prebuilt/position.component.js';
import type { Entity } from '../entity/entity.class.js';
import type { Initializable } from '../system/initializable.interface.js';
import { System } from '../system/system.type.js';
import type { GridWorld } from '../world/grid-world.class.js';
import type { IOBackend } from './backend/io-backend.interface.js';
import { Sprite } from './sprite.class.js';

export class RendererSystem extends System implements Initializable {
	order = Infinity;
	cameraEntity: Entity;
	camera: CameraComponent;
	currentFrame?: Sprite;

	backend: IOBackend;

	constructor(cameraEntity: Entity, rendererBackend: IOBackend) {
		super();
		this.cameraEntity = cameraEntity;
		this.camera = this.cameraEntity.getComponent(CameraComponent)!;
		this.backend = rendererBackend;
	}

	async init(): Promise<void> {
		await this.backend.init((size) => this.camera.resize(size));
	}

	tick(world: GridWorld): boolean {
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
		].sort((a, b) => a[1].z - b[1].z)) {
			const screenPosition = this.camera.getScreenPositionFromWorldPosition(
				positionComponent.position
			);
			const entityRender = displayComponent.sprite;

			const entityScreenBox = entityRender.boundingBox.clone().moveTopLeftTo(screenPosition);

			if (this.camera.screenViewport.intersects(entityScreenBox)) {
				for (let y = 0; y < entityRender.matrix.length; y++) {
					if (this.camera.screenViewport.vertical.contains(y)) {
						const displayRow = frame.matrix[screenPosition.y + y];
						const entityRenderRow = entityRender.matrix[y];
						if (displayRow) {
							for (let x = 0; x < entityRenderRow.length; x++) {
								if (this.camera.screenViewport.horizontal.contains(x)) {
									const cell = entityRenderRow[x];
									if (cell) {
										displayRow[screenPosition.x + x] = cell;
									}
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
