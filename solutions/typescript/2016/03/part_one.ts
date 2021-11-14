import { bench, read, split } from '@lib';
import { day, year } from './index';
import { isTriangle, Triangle } from './is-triangle.function';

export const runner = (input: string): number => {
	const splitOptions = { toIntOptions: { safe: true } };
	const result = split(input).reduce((acc, line) => {
		const sides = line.splitToInt(splitOptions) as Triangle;
		return isTriangle(sides) ? acc + 1 : acc;
	}, 0);
	return result;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 869 ~0.9385ms
}
