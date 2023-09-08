import type { Awaitable } from './awaitable.type.js';

export type Solution<Input = string, Result = number, Args = undefined> = (
	input: Input,
	args: Args | undefined,
) => Awaitable<Result>;
