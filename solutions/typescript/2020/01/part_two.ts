import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const numbers = split(input).map((line) => parseInt(line, 10));
	for (let i = 0; i < numbers.length; i++) {
		const ni = numbers[i];
		for (let j = i + 1; j < numbers.length; j++) {
			const nj = numbers[j];
			for (let k = j + 1; k < numbers.length; k++) {
				const nk = numbers[k];
				if (ni + nj + nk === 2020) {
					return ni * nj * nk;
				}
			}
		}
	}
	return 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 262738554 ~3.4ms
}
