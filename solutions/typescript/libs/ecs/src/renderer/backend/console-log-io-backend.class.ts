import { renderMatrix, type Vec2Like } from '@alexaegis/advent-of-code-lib';
import { noopAsync } from '@alexaegis/common';
import type { Sprite } from '../sprite.class.js';
import type {
	IOBackend,
	KeyboardEventCallback,
	MouseEventCallback,
} from './io-backend.interface.js';

/**
 * The absolute simplest rendering backend, just console logs the entire frame
 */
export class ConsoleLogIOBackend implements IOBackend {
	setTitle(_title: string): void {
		return;
	}

	async init(_resize: (size: Vec2Like) => void): Promise<void> {
		await noopAsync();
		return;
	}

	close(): void {
		return;
	}

	pushFrame(frame: Sprite): void {
		console.log(renderMatrix(frame.asStringMatrix()));
	}
	onKeyPress(_callback: KeyboardEventCallback): void {
		return;
	}
	onMouseMove(_callback: MouseEventCallback): void {
		return;
	}
	onTerminateRequest(_callback: () => void): void {
		return;
	}
}
