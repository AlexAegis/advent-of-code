import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	const nums = [...input].filter((c) => /^(\+|-)?[0-9]+/.test(c)).map((c) => Number(c));
	let sum = 0;
	for (let i = 0; i < nums.length; i++) {
		if (nums[i] === nums[(i + nums.length / 2) % nums.length]) {
			sum += nums[i];
		}
	}
	return sum;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1060 ~0.9ms
}
