import type { Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { Sprite } from '../sprite.class.js';

export abstract class RendererBackend {
	protected lastFrame?: Sprite;
	protected currentFrame?: Sprite;

	pushFrame(frame: Sprite): void {
		this.lastFrame = this.currentFrame;
		this.currentFrame = frame;
	}

	abstract setTitle(title: string): void;
	/**
	 * Call this when the backend is ready
	 */
	abstract init(resize: (size: Vec2Like) => void): Promise<void>;

	abstract close(): void;

	abstract cellpainter(x: number, y: number, cell: string): void;

	abstract flush(): void;
}
