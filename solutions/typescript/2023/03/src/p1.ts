/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction, Vec2, isNotNullish, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const m = input.toMatrix();
	const numbers: number[] = [];
	let number: string | undefined = undefined;
	let numberPositions: Vec2[] = [];

	for (let y = 0; y < m.length; y++) {
		const row = m[y]!;
		for (let x = 0; x < row.length; x++) {
			const v = row[x]!;

			if (/\d/.test(v)) {
				number = number === undefined ? v : number + v;
				numberPositions.push(new Vec2({ x, y }));
			} else if (
				number !== undefined &&
				numberPositions.some((numberPosition) =>
					Direction.allDirections
						.map((direction) => direction.add(numberPosition))
						.some((neighbour) => {
							const neighbourValue = m[neighbour.y]?.[neighbour.x];
							return neighbourValue && !/(\.|\d)/.test(neighbourValue);
						}),
				)
			) {
				const int = number.toInt();
				if (isNotNullish(int)) {
					numbers.push(int);
				}
				number = undefined;
				numberPositions = [];
			} else {
				number = undefined;
				numberPositions = [];
			}
		}
	}

	return numbers.sum();
};

await task(p1, packageJson.aoc); // 539637 ~1.39ms
