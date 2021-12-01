import { bench, read, split } from '@lib';
import { day, year } from './index';
import { isTriangle, Triangle } from './is-triangle.function';

export const runner = (input: string): number => {
	const splitOptions = { toIntOptions: { safe: true } };
	return split(input)
		.map((line) => line.splitToInt(splitOptions) as Triangle)
		.count(isTriangle);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 869 ~0.9385ms
}
