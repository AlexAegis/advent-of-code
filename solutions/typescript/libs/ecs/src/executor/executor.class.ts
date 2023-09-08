import type { Awaitable } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../world/grid-world.class.js';

export type ExecutorType = number | 'stepper' | 'instant';

export type ExecutorHaltConditionType =
	| 'untilSettled'
	| number
	| 'none'
	| ((world: GridWorld) => boolean);

export abstract class Executor {
	manualHalt = false;

	constructor(
		protected readonly world: GridWorld,
		protected readonly haltCondition: ExecutorHaltConditionType,
	) {}

	abstract run(): Awaitable<number>;

	halt(): void {
		this.manualHalt = true;
	}

	isHalting(): boolean {
		if (this.manualHalt) {
			return true;
		} else if (this.haltCondition === 'none') {
			return false;
		} else if (this.haltCondition === 'untilSettled') {
			return this.world.systemsSettled;
		} else if (typeof this.haltCondition === 'number') {
			return this.world.timeData.tick >= this.haltCondition;
		} else {
			return this.haltCondition(this.world);
		}
	}
}
