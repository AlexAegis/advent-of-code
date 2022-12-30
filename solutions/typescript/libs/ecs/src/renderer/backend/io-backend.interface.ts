import type { Vec2, Vec2Like } from '@alexaegis/advent-of-code-lib';
import type { Sprite } from '../sprite.class.js';

export type ModifierKey = 'CTRL' | 'ALT' | 'SHIFT';

export type MouseEventCallback = (position: Vec2) => void;
export type KeyboardEventCallback = (char: string, modifier?: ModifierKey) => void;

export type IOBackendType = 'terminalKit' | 'blessed' | 'console';

export interface IOBackend {
	pushFrame(frame: Sprite): void;

	setTitle(title: string): void;
	/**
	 * Call this when the backend is ready
	 */
	init(resize: (size: Vec2Like) => void): Promise<void>;
	close(): void;

	onKeyPress(callback: KeyboardEventCallback): void;
	onMouseMove(callback: MouseEventCallback): void;
	onTerminateRequest(callback: () => void): void;
}
