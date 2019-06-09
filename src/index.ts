import { performance, PerformanceObserver } from 'perf_hooks';

import { promises } from 'fs';
import { tap } from 'rxjs/operators';

export type Awaitable<T> = Promise<T> | T;

/**
 * Some tasks define different handling for their examples than the real input.
 * These differencies can be stored alongside the input file as a `.args.json` file
 * which will be automatically read and parsed.
 */
export interface Input<T, A = undefined> {
	input: T;
	args?: A | undefined;
}

/**
 * The type of a part. There's a default
 * result for the input, but more can be added.
 */
export interface PartResults<T = number> {
	input: T;
	example: T;
	[key: string]: T;
}

/**
 * The type of all the available inputs when it's not presented
 * in a file
 */
export interface PartInputs<T, A> {
	input: Input<T, A>;
	example: Input<T, A>;
	[key: string]: Input<T, A>;
}

/**
 * The type of the results of a Day, describes
 * the results of both parts.
 */
export interface DayResults<O = number, T = O> {
	one: Partial<PartResults<O>>;
	two: Partial<PartResults<T>>;
}

/**
 * When the input is so brief that it's not even presented
 * to you as a separate page I just add them into the `index.ts`
 * in this format
 */
export interface DayInputs<O = number, T = O, A = undefined> {
	one: PartInputs<O, A>;
	two: PartInputs<T, A>;
}

/**
 * Convinience method to log out the content of a stream
 *
 * @param label optional labeling
 */
export const log = (label: string | undefined = undefined) =>
	tap(o => (label ? console.log(label, o) : console.log(o)));

/**
 * Convinienence method to split up a long string into it's
 * non empty lines in an OS agnostic way
 */
export const split = (input: string) => input.split(/\r?\n/).filter(line => !!line);

/**
 * Factory function to create an input supplier
 *
 * @param year of the task
 * @param day of the task
 * @param file in the resources folder of the task
 */
export const read = <A>(year: number, day: number, file: string = 'input.txt') => async (): Promise<
	Input<string, A>
> => {
	const baseUrl = `src/${year}/day${day < 10 ? '0' + day : day}/resources/`;

	const [input, args] = await Promise.all([
		promises.readFile(`${baseUrl}${file}`, {
			encoding: 'UTF-8'
		}) as Promise<string>,
		promises
			.readFile(`${baseUrl}${file.split('.')[0]}.args.json`, {
				encoding: 'UTF-8'
			})
			.catch(() => undefined) as Promise<string>
	]);

	return { input, args: args && JSON.parse(args) };
};

/**
 * Wrapper for running read/compute pairs. Benchmarks both using the performance api.
 *
 * @param reader input supplier for the `runner`
 * @param runner with the result of `reader`, produces an output
 */
export const bench = async <T, R = string, A = undefined>(
	reader: () => Awaitable<Input<T, A>>,
	runner: (input: T, args: A | undefined) => Awaitable<R>
) => {
	performance.mark('start');
	const obs = new PerformanceObserver(list => {
		list.getEntries().forEach(entry => {
			console.log(`${entry.name}: ${entry.duration} ms`);
		});
	});
	obs.observe({ entryTypes: ['measure'] });

	performance.mark('readstart');
	const { input, args } = await reader();
	performance.mark('readend');

	performance.mark('runstart');
	const result = await runner(input, args);
	performance.mark('runend');

	performance.measure('run', 'runstart', 'runend');
	performance.measure('read', 'readstart', 'readend');
	performance.measure('both', 'readstart', 'runend');
	performance.measure('total', 'start', 'runend');
	obs.disconnect();
	return result;
};
