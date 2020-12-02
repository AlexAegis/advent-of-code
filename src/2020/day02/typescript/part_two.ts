import { bench, read, split } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	let count = 0;
	for (const line of split(input)) {
		const [name, val] = line.split(': ');
		const [nums, letter] = name.split(' ');
		const [numa, numb] = nums.split('-');
		const na = parseInt(numa, 10);
		const nb = parseInt(numb, 10);

		const aa = val[na - 1] === letter;
		const ab = val[nb - 1] === letter;

		if (aa !== ab) {
			count = count + 1;
		}
	}

	return count;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 593 ~2.4ms
}
