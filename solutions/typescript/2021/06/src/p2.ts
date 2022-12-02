import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string, maxDay = 256): number => {
	const initial = input.splitToInt({ delimiter: /,/ });
	// period, fishCount
	const groupedFishes = new Map<number, number>();
	for (const fish of initial) {
		groupedFishes.update(fish, (value = 0) => value + 1);
	}

	let day = 0;
	while (day < maxDay) {
		const previous = groupedFishes.get(day % 9) ?? 0;
		groupedFishes.update((day + 7) % 9, (value = 0) => value + previous);
		day++;
	}

	return [...groupedFishes.values()].sum();
};

await task(p2, packageJson.aoc); // 1634946868992 ~0.03ms
