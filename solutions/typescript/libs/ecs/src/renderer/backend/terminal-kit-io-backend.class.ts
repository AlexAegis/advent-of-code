import { Vec2, type Vec2Like } from '@alexaegis/advent-of-code-lib';
import terminalKit, { ScreenBuffer } from 'terminal-kit';
import type { Sprite } from '../sprite.class.js';
import type {
	IOBackend,
	KeyboardEventCallback,
	ModifierKey,
	MouseEventCallback,
} from './io-backend.interface.js';

type TerminalKitEventData =
	| { isCharacter: true; codepoint: number; code: number }
	| { isCharacter: false; code: Buffer };

interface TerminalKitMouseEventData {
	shift: boolean;
	alt: boolean;
	ctrl: boolean;
	x: number;
	y: number;
	code: number;
}

const detectTerminal = (): Promise<terminalKit.Terminal> =>
	new Promise((resolve, reject) => {
		terminalKit.getDetectedTerminal((error, terminal) => {
			if (error) {
				reject(error);
			} else {
				resolve(terminal);
			}
		});
	});

export class TerminalKitIOBackend implements IOBackend {
	terminal!: terminalKit.Terminal;

	private buffer!: ScreenBuffer;

	private terminateRequests: (() => void)[] = [];
	private keyEmitters: KeyboardEventCallback[] = [];
	private mouseEmitters: MouseEventCallback[] = [];

	setTitle(title: string): void {
		this.terminal.windowTitle(title);
	}

	async init(resizeNotifier: (size: Vec2Like) => void): Promise<void> {
		this.terminal = await detectTerminal();
		this.terminal.fullscreen(true);
		this.terminal.hideCursor();

		this.terminal.grabInput({ mouse: 'motion' }, false);

		this.buffer = new terminalKit.ScreenBuffer({ dst: this.terminal });
		resizeNotifier({ x: this.terminal.width, y: this.terminal.height });

		this.terminal.on('resize', (width: number, height: number) => {
			this.buffer.resize(new terminalKit.Rect(0, width, 0, height));
			resizeNotifier({ x: width, y: height });
		});

		this.terminal.on(
			'key',
			async (name: string, _matches: string[], _data: TerminalKitEventData) => {
				let modifier: ModifierKey | undefined;
				let event = name;

				if (name.includes('_')) {
					const [mod, key] = name.splitIntoStringPair('_');
					modifier = mod as ModifierKey;
					event = key;
				}

				if (/^[A-Z]$/.test(name)) {
					event = name.toLowerCase();
					modifier = 'SHIFT';
				}

				for (const callback of this.keyEmitters) callback(event, modifier);

				if (name === 'CTRL_C' || name === 'ESCAPE') {
					for (const callback of this.terminateRequests) callback();
					await this.close();
					// eslint-disable-next-line unicorn/no-process-exit
					process.exit(0);
				}
			},
		);

		this.terminal.on('mouse', (_eventName: string, data: TerminalKitMouseEventData) => {
			for (const callback of this.mouseEmitters) {
				callback(new Vec2(data.x, data.y));
			}
		});
	}

	pushFrame(frame: Sprite): void {
		frame.forEach(({ x, y }, tile) => {
			this.buffer.put(
				{
					x,
					y,
					dx: 0,
					dy: 0,
					wrap: false,
					attr: { color: tile.fg ?? 'white', bgTransparency: !tile.bg, bgColor: tile.bg },
				},
				tile.char ?? ' ',
			);
		});
		this.buffer.draw({ delta: true });
	}

	onMouseMove(callback: MouseEventCallback): void {
		this.mouseEmitters.push(callback);
	}

	onKeyPress(callback: KeyboardEventCallback): void {
		this.keyEmitters.push(callback);
	}

	onTerminateRequest(callback: () => void): void {
		this.terminateRequests.push(callback);
	}

	async close(): Promise<void> {
		this.terminal.reset();
		this.terminal.clear();
		await this.terminal.asyncCleanup();
	}
}
