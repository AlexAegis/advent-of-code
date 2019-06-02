import { performance, PerformanceObserver } from 'perf_hooks';

/**
 * Wrapper for running read/compute pairs. Benchmarks both using the performance api.
 *
 * @param reader Async input supplier for the `runner`
 * @param runner with the result of `reader`, produces an output
 */
export const bench = async <T>(reader: () => Promise<T>, runner: (input: T) => Promise<any>) => {
	performance.mark('start');
	const obs = new PerformanceObserver(list => {
		list.getEntries().forEach(entry => {
			console.log(`${entry.name}: ${entry.duration} ms`);
		});
	});
	obs.observe({ entryTypes: ['measure'] });

	performance.mark('readstart');
	const input = await reader();
	performance.mark('readend');

	performance.mark('runstart');
	const result = await runner(input);
	performance.mark('runend');

	performance.measure('run', 'runstart', 'runend');
	performance.measure('read', 'readstart', 'readend');
	performance.measure('both', 'readstart', 'runend');
	performance.measure('total', 'start', 'runend');
	obs.disconnect();
	return result;
};
