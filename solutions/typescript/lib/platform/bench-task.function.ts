import { performance, PerformanceObserver } from 'perf_hooks';
import { roundToDecimal } from '../math/index.js';
import type { Awaitable, TaskResources } from './task-resources.type.js';

/**
 * Wrapper for running read/compute pairs. Benchmarks both using the performance api.
 *
 * @param resources input supplier for the `runner`
 * @param runner with the result of `reader`, produces an output
 */
export const benchTask = async <T, R = string, A = undefined>(
	runner: (input: T, args: A | undefined) => Awaitable<R>,
	resources: TaskResources<T, A>
): Promise<R> => {
	const obs = new PerformanceObserver((list) => {
		list.getEntries().forEach((entry) => {
			console.log(`${entry.name}: ${roundToDecimal(entry.duration, 2)} ms`);
		});
	});
	obs.observe({ entryTypes: ['measure'], buffered: true });
	performance.mark('runstart');
	const result = await runner(resources.input, resources.args);
	performance.mark('runend');
	performance.measure('run', 'runstart', 'runend');
	return result;
};
