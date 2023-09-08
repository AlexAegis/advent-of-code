import {
	BehaviorSubject,
	interval,
	lastValueFrom,
	Observable,
	switchMap,
	takeWhile,
	tap,
} from 'rxjs';
import type { GridWorld } from '../world/grid-world.class.js';
import { Executor, type ExecutorHaltConditionType } from './executor.class.js';

/**
 * Executes a tick then waits a set time. It's good for inspecting an execution.
 */
export class IntervalExecutor extends Executor {
	private timeInterval$: BehaviorSubject<number>;
	private onTickCallbacks: ((world: GridWorld) => void)[] = [];
	private tick$: Observable<number>;

	constructor(world: GridWorld, haltCondition: ExecutorHaltConditionType, timeInterval: number) {
		super(world, haltCondition);

		this.timeInterval$ = new BehaviorSubject(timeInterval);

		this.tick$ = this.timeInterval$.pipe(
			switchMap((timeInterval) => interval(timeInterval)),
			takeWhile(() => !this.isHalting()),
			tap(() => {
				this.world.tick();
				for (const callback of this.onTickCallbacks) callback(this.world);
			}),
		);
	}

	async run(): Promise<number> {
		await this.world.initializeSystems();
		return lastValueFrom(this.tick$);
	}

	setTimeInterval(timeInterval: number): void {
		this.timeInterval$.next(timeInterval);
	}

	onTick(callback: (world: GridWorld) => void): void {
		this.onTickCallbacks.push(callback);
	}
}
