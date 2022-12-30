import type { Awaitable } from '@alexaegis/advent-of-code-lib';

export interface Initializable {
	init(): Awaitable<void>;
}
