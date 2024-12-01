import { task } from '@alexaegis/advent-of-code-lib';
import { renderMatrix } from '@alexaegis/advent-of-code-lib/functions';
import { Direction } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

const expand = (input: string, factor = 5): string => {
	const matrix = input.toMatrix().map((row) => row.map((e) => Number.parseInt(e, 10)));

	const first = factor.iterate().reduce<number[][]>((acc, n) => {
		for (const row of matrix) {
			acc.push(
				row.map((t) => {
					let next = (t + n) % 10;
					if (t + n > 9) {
						next += 1;
					}
					return next;
				}),
			);
		}
		return acc;
	}, []);

	for (let r = 0; r < first.length; r++) {
		const row = first[r] ?? [];
		const expandedRow = factor.iterate().reduce<number[]>((acc, n) => {
			acc.push(
				...row.map((t) => {
					let next = (t + n) % 10;
					if (t + n > 9) {
						next += 1;
					}
					return next;
				}),
			);

			return acc;
		}, []);
		first[r] = expandedRow;
	}
	return renderMatrix(first);
};

export const p2 = (input: string): number => {
	const graph = expand(input).toGridGraph<number>({
		valueConverter: (s) => Number.parseInt(s, 10),
		weighter: (a, b) => b.value - a.value,
		connectionDirections: Direction.cardinalDirections,
	});

	const boundingBox = graph.boundingBox();
	const start = graph.getNode(boundingBox.topLeft);
	const end = graph.getNode(boundingBox.bottomRight);

	if (!start) {
		throw new Error('Start node does not exist');
	}

	const { path } = graph.aStar({ start, end, heuristic: (_a, p) => p.map((n) => n.value).sum() });

	return path.map((p) => p.value).sum() - (start?.value ?? 0);
};

await task(p2, packageJson.aoc); // 2925 ~30s
