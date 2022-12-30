import type { ExecutorHaltConditionType, ExecutorType } from '../executor/executor.class.js';
import type { IOBackendType } from '../renderer/index.js';

export interface GridWorldOptions {
	/**
	 * @default undefined
	 */
	io?: IOBackendType | undefined;
	/**
	 * @default 60
	 */
	executorSpeed?: ExecutorType;

	/**
	 * @default 'untilSettled'
	 */
	executorHaltCondition?: ExecutorHaltConditionType;
}

export type NormalizedGridWorldOptions = Required<Omit<GridWorldOptions, 'io'>> & GridWorldOptions;

export const normalizeGridWorldOptions = (
	options?: GridWorldOptions
): NormalizedGridWorldOptions => {
	return {
		io: options?.io,
		executorSpeed: options?.executorSpeed ?? 60,
		executorHaltCondition: options?.executorHaltCondition ?? 'untilSettled',
	};
};
