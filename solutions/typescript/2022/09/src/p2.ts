import { task, Vec2 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p2 = (input: string): number => {
	const moves = parse(input);
	const rope = Array.from({ length: 9 }, (_) => new Vec2(0, 0));
	const head = new Vec2(0, 0);
	const tailTrail = new Set<string>();
	tailTrail.add(rope.last().toString());

	for (const move of moves) {
		for (let i = 0; i < move.count; i++) {
			head.addMut(move.direction);
			let previousKnot = head;
			for (const knot of rope) {
				if (!previousKnot.isNeighbour(knot)) {
					knot.addMut(knot.stepVec(previousKnot).normalizeMut());
				}
				previousKnot = knot;
			}
			tailTrail.add(rope.last().toString());
		}
	}

	return tailTrail.size;
};

await task(p2, packageJson.aoc); // 2533 ~4.55ms
