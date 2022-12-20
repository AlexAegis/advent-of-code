import type { Awaitable } from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../grid-world.class.js';

export abstract class Executor {
	constructor(protected readonly world: GridWorld) {}

	abstract run(): Awaitable<void>;
}
