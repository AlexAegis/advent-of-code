import { Executor } from './executor.class.js';

/**
 * Rushes to the end-state
 */
export class UntilHaltExecutor extends Executor {
	async run(): Promise<number> {
		await this.world.initializeSystems();

		while (!this.isHalting()) {
			this.world.tick();
		}

		return this.world.timeData.tick;
	}
}
