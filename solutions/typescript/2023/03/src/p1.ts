/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Direction, Vec2, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const m = input.toMatrix();
	const numbers: number[] = [];
	let num: string | undefined = undefined;
	let lastVecs: Vec2[] = [];

	for (let y = 0; y < m.length; y++) {
		const row = m[y]!;

		for (let x = 0; x < row.length; x++) {
			const v = row[x]!;

			if (/\d/.test(v)) {
				num = num === undefined ? v : num + v;
				lastVecs.push(new Vec2({ x, y: y }));
			} else if (
				num !== undefined &&
				lastVecs.some((lv) =>
					Direction.allDirections
						.map((d) => d.add(lv))
						.some((v) => {
							// const cv = new Vec2(x, i);
							const n = m[v.y]?.[v.x];
							if (n) {
								// console.log(num, n, v.toString());
							}
							return (
								n &&
								(n === '#' ||
									n === '$' ||
									n === '%' ||
									n === '&' ||
									n === '*' ||
									n === '+' ||
									n === '/' ||
									n === '=' ||
									n === '-' ||
									n === '@')
							);
						}),
				)
			) {
				//TODO check surr
				numbers.push(num.toInt());
				// console.log('FOUND', num);
				num = undefined;
				lastVecs = [];
			} else {
				num = undefined;
				lastVecs = [];
			}
		}
	}

	return numbers.sum();
};

await task(p1, packageJson.aoc); // 539637 ~1.39ms
