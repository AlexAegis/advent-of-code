import { bench, read } from '@lib';
import { Direction, Vec2 } from '@lib/model';
import { day, year } from '.';

const flash = (map: Map<string, number>, flashed: Set<string>) => {
	let doAnother = false;
	[...map.entries()]
		.filter(([key, value]) => value > 9 && !flashed.has(key))
		.forEach(([key]) => {
			flashed.add(key);
			doAnother = true;
			Direction.directions
				.map((direction) => new Vec2(key).addMut(direction).toString())
				.filter((neighbour) => map.has(neighbour))
				.forEach((neighbour) => {
					map.change(
						neighbour,
						(v) => v + 1,
						() => 1
					);
				});
		});
	if (doAnother) {
		flash(map, flashed);
	}
};

export const next = (map: Map<string, number>): number => {
	const flashed = new Set<string>();
	// Increment everything by 1
	[...map.keys()].forEach((key) =>
		map.change(
			key,
			(v) => v + 1,
			() => 1
		)
	);

	// Flash 9s
	flash(map, flashed);
	// All flashed set to 0
	[...flashed.values()].forEach((key) => map.set(key, 0));
	return flashed.size;
};

export const runner = (input: string): number => {
	const om = input.toVectorMap((s) => s.tryInt());
	let totalFlashes = 0;
	for (let step = 0; step < 100; step++) {
		totalFlashes += next(om);
	}
	return totalFlashes;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 193275 ~10.45ms
}
