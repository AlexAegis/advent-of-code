/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction, Vec2, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const m = input.toMatrix();
	let number: string | undefined = undefined;
	let numberPositions: Vec2[] = [];

	const gears = new Map<string, number[]>();
	for (let y = 0; y < m.length; y++) {
		const row = m[y]!;

		for (let x = 0; x < row.length; x++) {
			const v = row[x]!;

			const gearVector = numberPositions
				.map((lv) =>
					Direction.allDirections
						.map((d) => d.add(lv))
						.find((v) => {
							const n = m[v.y]?.[v.x];
							return n && n === '*';
						}),
				)
				.find((v) => !!v);

			if (/\d/.test(v)) {
				number = number === undefined ? v : number + v;
				numberPositions.push(new Vec2({ x, y }));
			} else if (number !== undefined && gearVector) {
				if (gears.has(gearVector.toString())) {
					gears.get(gearVector.toString())?.push(number.toInt());
				} else {
					gears.set(gearVector.toString(), [number.toInt()]);
				}
				number = undefined;
				numberPositions = [];
			} else {
				number = undefined;
				numberPositions = [];
			}
		}
	}

	return gears
		.valueArray()
		.filter((gearValues) => gearValues.length === 2)
		.map((gearValues) => gearValues.product())
		.sum();
};

await task(p2, packageJson.aoc); // 82818007 ~3.89ms
