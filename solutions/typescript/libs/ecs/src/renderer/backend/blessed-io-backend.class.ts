import type { Vec2Like } from '@alexaegis/advent-of-code-lib';
import type {
	IOBackend,
	KeyboardEventCallback,
	MouseEventCallback,
} from './io-backend.interface.js';

import blessed, { BlessedProgram } from 'blessed';
import type { Sprite } from '../sprite.class.js';

export class BlessedIOBackend implements IOBackend {
	program!: BlessedProgram;

	setTitle(title: string): void {
		this.program.setTitle(title);
	}

	// eslint-disable-next-line @typescript-eslint/require-await
	async init(_resizeNotifier: (size: Vec2Like) => void): Promise<void> {
		this.program = blessed.program({
			smartCSR: true,
		});

		this.program.alternateBuffer();
		this.program.enableMouse();
		this.program.hideCursor();
		this.program.clear();

		this.program.addListener('resize', (_e) => {
			this.program.getWindowSize((a: unknown) => {
				console.log('getWindowSize', a);
			});
		});

		this.program.key('q', async () => {
			await this.close();
			console.log('PANIC');
			// eslint-disable-next-line unicorn/no-process-exit
			process.exit(0);
		});
	}

	pushFrame(frame: Sprite): void {
		frame.forEach(({ x, y }, cell) => {
			this.program.move(x, y);
			this.program.bg('black');
			this.program.write(cell.char ?? ' ');
		});

		this.program.flush();
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

	// eslint-disable-next-line @typescript-eslint/require-await
	async close(): Promise<void> {
		this.program.clear();
		this.program.disableMouse();
		this.program.showCursor();
		this.program.normalBuffer();
		// eslint-disable-next-line unicorn/no-process-exit
		process.exit(0);
	}
}
