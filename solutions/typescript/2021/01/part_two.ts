import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const data = input.splitToInt();
	const prevs: [number | undefined, number | undefined, number | undefined] = [
		undefined,
		undefined,
		undefined,
	];
	let inc = 0;
	const sums = [];
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		prevs[0] = prevs[1];
		prevs[1] = prevs[2];
		prevs[2] = element;
		if (prevs[0] && prevs[1] && prevs[2]) {
			sums.push(prevs.sum());
		}
	}
	let prevSum = undefined;
	for (let i = 0; i < sums.length; i++) {
		const element = sums[i];
		if (prevSum && prevSum < element) {
			inc++;
		}
		prevSum = element;
	}

	return inc;
};
// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1395 ~0.20ms
}
