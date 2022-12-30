import { Executor } from './executor.class.js';

/**
 * Rushes to the end-state
 */
export class StepperExecutor extends Executor {
	async run(): Promise<number> {
		await this.world.initializeSystems();
		return this.world.timeData.tick;
	}

	tick(maxTick = Infinity): boolean {
		return !this.world.systemsSettled && this.world.timeData.tick < maxTick;
	}
}
