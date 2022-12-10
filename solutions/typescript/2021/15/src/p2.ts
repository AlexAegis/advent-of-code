import { task } from '@alexaegis/advent-of-code-lib';
import { renderMatrix } from '@alexaegis/advent-of-code-lib/functions';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

const expand = (input: string, factor = 5): string => {
	const matrix = input.toMatrix().map((row) => row.map((e) => parseInt(e, 10)));
	const first = factor.iterate().reduce((acc, n) => {
		for (const row of matrix) {
			acc.push(
				row.map((t) => {
					let next = (t + n) % 10;
					if (t + n > 9) {
						next += 1;
					}
					return next;
				})
			);
		}
		return acc;
	}, [] as number[][]);

	for (let r = 0; r < first.length; r++) {
		const row = first[r];
		const expandedRow = factor.iterate().reduce((acc, n) => {
			acc.push(
				...row.map((t) => {
					let next = (t + n) % 10;
					if (t + n > 9) {
						next += 1;
					}
					return next;
				})
			);

			return acc;
		}, [] as number[]);
		first[r] = expandedRow;
	}
	return renderMatrix(first);
};

export const p2 = (input: string): number => {
	const graph = expand(input).toGridGraph<number>({
		valueConverter: (s) => parseInt(s, 10),
		weighter: (b, a) => (a.value as number) - (b.value as number),
		connectionDirections: Direction.cardinalDirections,
	});

	const { topLeft, bottomRight } = graph.boundingBox();
	const start = graph.getNode(topLeft);
	const end = graph.getNode(bottomRight);

	const path = graph.aStar(start, end, {
		heuristic: (_a, p) => {
			return p.map((n) => n.value).sum();
		},
	});

	return path.map((p) => p.value).sum() - (start?.value ?? 0);
};

await task(p2, packageJson.aoc); // 2703 ~30s
