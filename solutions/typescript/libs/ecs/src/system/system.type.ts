import type { Awaitable } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../grid-world.class.js';

/**
 * Systems should return if they did something to the world or not, so the
 * world can halt once all systems settled
 */
export type SystemFn = (world: GridWorld) => Awaitable<boolean>;

/**
 * Abstract system with internal state
 */
export abstract class System {
	abstract order?: number;

	abstract tick(world: GridWorld): Awaitable<boolean>;
}

export type SystemLike = SystemFn | System;
