import type { Awaitable } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../world/grid-world.class.js';
import type { TimeData } from '../world/time-data.interface.js';

/**
 * Systems should return if they did something to the world or not, so the
 * world can halt once all systems settled
 */
export type SystemFn = (world: GridWorld, timeData: TimeData) => boolean | undefined;

/**
 * Abstract system with internal state
 */
export abstract class System {
	abstract readonly order?: number;

	abstract init(world: GridWorld): Awaitable<void>;

	abstract tick(world: GridWorld, timeData: TimeData): boolean | undefined;
}

export type SystemLike = SystemFn | System;
