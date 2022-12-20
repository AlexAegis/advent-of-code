import type { Vec2Like } from '@alexaegis/advent-of-code-lib';
import terminalKit, { ScreenBuffer } from 'terminal-kit';
import { RendererBackend } from './renderer-backend.class.js';

export class TerminalKitRendererBackend extends RendererBackend {
	private static readonly terminal = terminalKit.terminal;

	private buffer?: ScreenBuffer;

	setTitle(title: string): void {
		TerminalKitRendererBackend.terminal.windowTitle(title);
	}

	async init(resizeNotifier: (size: Vec2Like) => void): Promise<void> {
		TerminalKitRendererBackend.terminal.fullscreen(true);
		this.buffer = new terminalKit.ScreenBuffer({ dst: TerminalKitRendererBackend.terminal });

		TerminalKitRendererBackend.terminal.on('resize', (width: number, height: number) => {
			console.log("'resize' event:", width, height);
			// Might not needed
			// this.buffer?.resize({ width, height })
			resizeNotifier({ x: width, y: height });
		});

		await TerminalKitRendererBackend.terminal.grabInput({ mouse: 'motion' }, true);
	}

	cellpainter(x: number, y: number, cell: string): void {
		this.buffer?.put(
			{ x, y, dx: 1, dy: 0, wrap: false, attr: { color: 'white', bgTransparency: true } },
			cell
		);
	}

	flush(): void {
		this.buffer?.draw({ delta: true });
	}

	async close(): Promise<void> {
		TerminalKitRendererBackend.terminal.clear();
		await TerminalKitRendererBackend.terminal.asyncCleanup();
	}
}
