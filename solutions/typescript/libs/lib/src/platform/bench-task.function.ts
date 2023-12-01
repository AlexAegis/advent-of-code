import { performance, PerformanceObserver } from 'node:perf_hooks';
import { roundToDecimal } from '../math/index.js';
import type { Logger } from './logger.function.js';
import type { Solution } from './solution.type.js';
import type { TaskResources } from './task-resources.type.js';

/**
 * Wrapper for running read/compute pairs. Benchmarks both using the performance api.
 *
 * @param resources input supplier for the `runner`
 * @param runner with the result of `reader`, produces an output
 */
export const benchTask = async <Input, Result = string, Args = undefined>(
	runner: Solution<Input, Result, Args>,
	resources: TaskResources<Input, Args>,
	logger?: Logger,
): Promise<Result> => {
	// TODO: Remove the if once PerformanceObserver is implemented in bun
	if (process.versions['bun'] === undefined) {
		const obs = new PerformanceObserver((list) => {
			list.getEntries().forEach((entry) => {
				logger?.(`${entry.name}: ${roundToDecimal(entry.duration, 2)} ms`);
			});
		});
		obs.observe({ entryTypes: ['measure'], buffered: true });
	}

	performance.mark('runstart');
	const result = await runner(resources.input, resources.args);
	performance.mark('runend');
	performance.measure('run', 'runstart', 'runend');
	return result;
};
