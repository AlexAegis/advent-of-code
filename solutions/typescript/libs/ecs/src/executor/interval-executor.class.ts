import { sleep } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../grid-world.class.js';
import { Executor } from './executor.class.js';

/**
 * Executes a tick then waits a set time. It's good for inspecting an execution.
 *
 * TODO: to make this okay for game loops too, instead of sleeping a set amount
 * use RxJS intervals
 */
export class IntervalExecutor extends Executor {
	private interval = 200;
	private onTickCallbacks: ((world: GridWorld) => void)[] = [];

	async run(untilTick = Infinity): Promise<void> {
		while (!this.world.systemsSettled && this.world.time < untilTick) {
			this.world.tick();
			this.onTickCallbacks.forEach((callback) => callback(this.world));
			await sleep(this.interval);
		}
	}

	setInterval(interval: number): void {
		this.interval = interval;
	}

	onTick(callback: (world: GridWorld) => void): void {
		this.onTickCallbacks.push(callback);
	}
}
