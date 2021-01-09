import { bench, read, split } from '@lib';
import { asc } from '@lib/math';
import { Args, day, year } from '.';

export const runner = (input: string, args?: Args): number => {
	const xmas = split(input).map((line) => parseInt(line, 10));
	const target = args?.target ?? NaN;
	for (let i = 0; i < xmas.length; i++) {
		let sum = xmas[i];
		let window = 1;
		const seq = [sum];
		while (sum <= target) {
			const num = xmas[i + window];
			sum += num;
			seq.push(num);
			if (sum === target) {
				const sorted = seq.sort(asc);
				return sorted[0] + sorted[sorted.length - 1];
			}
			window++;
		}
	}
	return 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 28509180 ~2.8ms
}
