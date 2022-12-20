import { renderMatrix, Vec2Like } from '@alexaegis/advent-of-code-lib';
import { RendererBackend } from './renderer-backend.class.js';

/**
 * The absolute simplest rendering backend, just console logs the entire frame
 */
export class ConsoleLogRendererBackend extends RendererBackend {
	setTitle(_title: string): void {
		return;
	}

	async init(_resize: (size: Vec2Like) => void): Promise<void> {
		return;
	}

	close(): void {
		return;
	}

	cellpainter(_x: number, _y: number, _cell: string): void {
		return;
	}

	flush(): void {
		if (this.currentFrame) {
			console.log(renderMatrix(this.currentFrame.matrix));
		}
	}
}
