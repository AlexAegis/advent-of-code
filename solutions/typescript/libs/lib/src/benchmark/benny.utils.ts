import { add, complete, cycle, save as rawSave, suite } from 'benny';
import type { SaveOptions } from 'benny/lib/internal/common-types.js';

const saveDefaults: SaveOptions = {
	file: 'reduce',
	folder: '.benchmark/result',
};

const save = (saveOptions?: SaveOptions): ReturnType<typeof rawSave> =>
	rawSave({
		...saveDefaults,
		...saveOptions,
	});

/**
 * TODO: AutoUpdate readme.md with the results
 * @param options
 */
export const cycleTime = (options?: {
	precision: number;
	autoUpdate: boolean;
}): ReturnType<typeof cycle> => {
	const precision = options?.precision ?? 4;
	return cycle((c): void => {
		console.info(`${c.name}, mean: ${(c.details.mean * 1000).toFixed(precision)}ms`);
	});
};

export const defaultBench = (
	name: string,
	...cases: ReturnType<typeof add>[]
): ReturnType<typeof suite> => {
	return suite(
		name,
		...cases,
		cycleTime(),
		complete(),
		save({ format: 'table.html' }),
		save({ format: 'chart.html' }),
		save({ format: 'json' }),
	);
};
