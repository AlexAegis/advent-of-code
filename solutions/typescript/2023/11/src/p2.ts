import { BoundingBox, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const { galaxies, emptyRows, emptyColumns } = parse(input);

	return galaxies
		.pairs()
		.map(([a, b]) => {
			const nonExpandedDistance = a.manhattan(b);
			const galaxyBox = BoundingBox.fromVectors([a, b]);
			const emptyRowCount = emptyRows.filter((i) => galaxyBox.vertical.contains(i)).length;
			const emptyColumnCount = emptyColumns.filter((i) =>
				galaxyBox.horizontal.contains(i),
			).length;

			return nonExpandedDistance + emptyRowCount * 999_999 + emptyColumnCount * 999_999;
		})
		.sum();
};

await task(p2, packageJson.aoc); // 10228230 ~0ms
