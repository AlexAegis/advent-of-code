import { bench, read } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number =>
	input
		.split(/\r?\n\r?\n/)
		.map((rawGroup) => rawGroup.split(/\r?\n/g))
		.map((group) => {
			const letterCounts = [...group.join('')]
				.reduce(
					(map, letter) => map.set(letter, (map.get(letter) ?? 0) + 1),
					new Map<string, number>()
				)
				.values();
			return [...letterCounts].filter((v) => v === group.length).length;
		})
		.reduce(sum);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3299 ~2.2ms
}
