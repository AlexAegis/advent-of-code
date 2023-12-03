/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Direction, Vec2, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
	const m = input.toMatrix();
	const numbers: number[] = [];
	let num: string | undefined = undefined;
	let lastVecs: Vec2[] = [];

	const gears = new Map<string, number[]>();
	for (let y = 0; y < m.length; y++) {
		const row = m[y]!;

		for (let x = 0; x < row.length; x++) {
			const v = row[x]!;

			const gearVec = lastVecs
				.map((lv) =>
					Direction.allDirections
						.map((d) => d.add(lv))
						.find((v) => {
							// const cv = new Vec2(x, i);
							const n = m[v.y]?.[v.x];
							if (n) {
								// console.log(num, n, v.toString());
							}
							return n && n === '*';
						}),
				)
				.find((v) => !!v);

			if (/\d/.test(v)) {
				num = num === undefined ? v : num + v;
				lastVecs.push(new Vec2({ x, y: y }));
			} else if (num !== undefined && gearVec) {
				//TODO check surr
				numbers.push(num.toInt());
				if (gears.has(gearVec.toString())) {
					gears.get(gearVec.toString())?.push(num.toInt());
				} else {
					gears.set(gearVec.toString(), [num.toInt()]);
				}
				num = undefined;
				lastVecs = [];
			} else {
				num = undefined;
				lastVecs = [];
			}
		}
	}

	return [...gears.values()]
		.filter((gp) => gp.length === 2)
		.map((gp) => gp.product())
		.sum();
};

await task(p2, packageJson.aoc); // 82818007 ~3.89ms
