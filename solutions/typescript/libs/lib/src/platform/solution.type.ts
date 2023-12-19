import type { Awaitable } from '@alexaegis/common';

export type Solution<Input = string, Result = number, Args = undefined> = (
	input: Input,
	args: Args | undefined,
) => Awaitable<Result>;
