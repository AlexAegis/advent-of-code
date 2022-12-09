import { task, Vec2 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p2 = (input: string): number => {
	const moves = parse(input);
	const rope = Array.from({ length: 10 }, (_) => new Vec2(0, 0));
	const tailTrail = new Set<string>();
	tailTrail.add(rope.last().toString());

	for (const move of moves) {
		for (let i = 0; i < move.count; i++) {
			rope[0].addMut(move.direction);
			rope.pairwise((previousKnot, knot) => {
				if (!previousKnot.isNeighbour(knot)) {
					knot.addMut(knot.subtract(previousKnot).normalizeMut());
				}
			});
			tailTrail.add(rope.last().toString());
		}
	}

	return tailTrail.size;
};

await task(p2, packageJson.aoc); // 2533 ~4.09ms
