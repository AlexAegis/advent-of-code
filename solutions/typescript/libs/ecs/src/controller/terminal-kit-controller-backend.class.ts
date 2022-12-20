import terminalKit from 'terminal-kit';
import { ControllerBackend } from './controller-backend.class.js';

type TerminalKitEventData =
	| { isCharacter: true; codepoint: number; code: number }
	| { isCharacter: false; code: Buffer };

export class TerminalKitControllerBackend extends ControllerBackend {
	private static readonly terminal = terminalKit.terminal;

	terminateRequests: (() => void)[] = [];
	keyEmitters: ((char: string) => void)[] = [];

	async start(): Promise<void> {
		await TerminalKitControllerBackend.terminal.grabInput({ mouse: 'motion' }, true);

		TerminalKitControllerBackend.terminal.on(
			'key',
			(name: string, _matches: string[], data: TerminalKitEventData) => {
				if (data.isCharacter) {
					this.keyEmitters.forEach((callback) => callback(name));
				}

				if (name === 'CTRL_C') {
					this.terminateRequests.forEach((callback) => callback());
					process.exit(0);
				}
			}
		);

		// TerminalKitControllerBackend.terminal.on(
		// 	'mouse',
		// 	(name: string, data: TerminalKitEventData) => {
		// 		console.log('mouse event', data);
		// 	}
		// );

		// TerminalKitControllerBackend.terminal.on('terminal', (name: string, data: string) => {
		// 	console.log('terminal event', name, data);
		// });
	}

	onKeyPress(callback: (char: string) => void): void {
		this.keyEmitters.push(callback);
	}

	onTerminateRequest(callback: () => void): void {
		this.terminateRequests.push(callback);
	}
}
