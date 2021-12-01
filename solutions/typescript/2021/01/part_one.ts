import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const data = input.splitToInt();
	let prev = undefined;
	let inc = 0;
	for (let i = 0; i < data.length; i++) {
		const element = data[i];
		if (prev && prev < element) {
			inc++;
		}
		prev = element;
	}
	return inc;
};
// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1451 ~0.15ms
}
