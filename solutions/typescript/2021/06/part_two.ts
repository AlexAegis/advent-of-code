import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string, maxDay = 256): number => {
	const initial = input.splitToInt({ delimiter: /,/ });
	// period, fishCount
	const groupedFishes = new Map<number, number>();
	for (const fish of initial) {
		groupedFishes.change(
			fish,
			(v) => v + 1,
			() => 1
		);
	}

	let day = 0;
	while (day < maxDay) {
		const previous = groupedFishes.get(day % 9) ?? 0;
		groupedFishes.change(
			(day + 7) % 9,
			(value) => value + previous,
			() => previous
		);
		day++;
	}

	return [...groupedFishes.values()].sum();
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 7468 ~0.03ms
}
