import { BoundingBox, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const solver =
	(expansion = 2) =>
	(input: string): number => {
		const { galaxies, emptyRows, emptyColumns } = parse(input);

		return galaxies
			.pairs()
			.map(([a, b]) => {
				const nonExpandedDistance = a.manhattan(b);
				const galaxyBox = BoundingBox.fromVectors([a, b]);
				const emptyRowCount = emptyRows.filter((i) =>
					galaxyBox.vertical.contains(i),
				).length;
				const emptyColumnCount = emptyColumns.filter((i) =>
					galaxyBox.horizontal.contains(i),
				).length;

				return (
					nonExpandedDistance +
					emptyRowCount * (expansion - 1) +
					emptyColumnCount * (expansion - 1)
				);
			})
			.sum();
	};

export const p1 = (input: string): number => solver(2)(input);

await task(p1, packageJson.aoc); // 10228230 ~104.54ms
