import { Executor } from './executor.class.js';

/**
 * Rushes to the end-state
 */
export class UntilHaltExecutor extends Executor {
	run(untilTick = Infinity): void {
		while (!this.world.systemsSettled && this.world.time < untilTick) {
			this.world.tick();
		}
	}
}
