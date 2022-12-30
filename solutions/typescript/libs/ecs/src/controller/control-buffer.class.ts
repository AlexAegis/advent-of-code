import { Vec2 } from '@alexaegis/advent-of-code-lib';
import type { IOBackend } from '../renderer/index.js';
import type { Initializable } from '../system/initializable.interface.js';

export class ControllerBuffer implements Initializable {
	mousePosition = Vec2.ORIGIN;
	keyBuffer: Record<string, number> = {};

	constructor(private readonly backend: IOBackend) {}

	init(): void {
		this.backend.onKeyPress((event, _modifier) => {
			this.keyBuffer[event] = 1;

			if (event === 'UP' || event === 'w') {
				this.keyBuffer['DOWN'] = 0;
				this.keyBuffer['s'] = 0;
			} else if (event === 'DOWN' || event === 's') {
				this.keyBuffer['UP'] = 0;
				this.keyBuffer['w'] = 0;
			} else if (event === 'LEFT' || event === 'a') {
				this.keyBuffer['RIGHT'] = 0;
				this.keyBuffer['d'] = 0;
			} else if (event === 'RIGHT' || event === 'd') {
				this.keyBuffer['LEFT'] = 0;
				this.keyBuffer['a'] = 0;
			}
		});

		this.backend.onMouseMove((event) => {
			this.mousePosition = event;
		});
	}
}
