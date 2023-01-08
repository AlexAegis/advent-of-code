import { renderMatrix, Vec2 } from '@alexaegis/advent-of-code-lib';
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

export interface RendererSystemOptions {
	cameraEntity: Entity;
	backend: IOBackend;
	renderColliders?: boolean;
}

export type NormalizedRendererSystemOptions = Required<RendererSystemOptions>;

const normalizeRendererSystemOptions = (
	options: RendererSystemOptions
): NormalizedRendererSystemOptions => {
	return {
		renderColliders: false,
		...options,
	};
};

export class RendererSystem extends System implements Initializable {
	order = Infinity;
	camera: CameraComponent;
	currentFrame?: Sprite;

	options: NormalizedRendererSystemOptions;

	constructor(options: RendererSystemOptions) {
		super();
		this.options = normalizeRendererSystemOptions(options);
		this.camera = this.options.cameraEntity.getComponent(CameraComponent)!;
	}

	async init(): Promise<void> {
		await this.options.backend.init((size) => this.camera.resize(size));
	}

	tick(world: GridWorld): boolean {
		this.currentFrame = this.render(world);
		this.options.backend.pushFrame(this.currentFrame);
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
			const entityScreenBox = displayComponent.sprite.boundingBox
				.clone()
				.moveTopLeftTo(screenPosition);

			const screenIntersection = this.camera.screenViewport.intersection(entityScreenBox);
			screenIntersection?.forEach((screenX, screenY) => {
				const worldX = this.camera.worldAnchor.x + screenX;
				const worldY = this.camera.worldAnchor.y + screenY;
				const localX = worldX - positionComponent.position.x;
				const localY = worldY - positionComponent.position.y;
				const cell = displayComponent.sprite.getCellAt(localX, localY);
				if (cell) {
					frame.render[screenY][screenX] = cell;
				}
			});
		}

		if (this.options.renderColliders) {
			this.renderCollidersOntoSprite(frame);
		}

		return frame;
	}

	private renderCollidersOntoSprite(frame: Sprite): void {
		// TODO: only change colors once colors are supported, so entities stay visible
		this.camera.screenViewport.forEach((x, y) => {
			const sp = new Vec2(x, y);
			const wp = this.camera.getWorldPositionFromScreenPosition(sp);
			const collidingEntities = this.camera.world.entitiesCollidingAt(wp).length;
			if (collidingEntities) {
				frame.put(x, y, collidingEntities.toString());
			}
		});
	}

	printCurrentFrame(): void {
		if (this.currentFrame) {
			const render = renderMatrix(this.currentFrame.render);
			console.log(render);
		}
	}
}
