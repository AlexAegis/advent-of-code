import { add, complete, cycle, save, suite } from 'benny';

export const cycleTime = (options?: { precision: number }): ReturnType<typeof cycle> => {
	const precision = options?.precision ?? 4;
	return cycle((c): void => {
		console.log(`${c.name}, mean: ${(c.details.mean * 1000).toFixed(precision)}ms`);
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
		save({ file: 'reduce', version: '1.0.0', format: 'table.html' }),
		save({ file: 'reduce', format: 'chart.html' })
	);
};
