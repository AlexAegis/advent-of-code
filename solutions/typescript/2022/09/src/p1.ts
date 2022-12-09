import { task, Vec2 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const p1 = (input: string): number => {
	const moves = parse(input);

	const head = new Vec2(0, 0);
	const tail = head.clone();
	const tailTrail = new Set<string>();
	tailTrail.add(tail.toString());

	for (const move of moves) {
		for (let i = 0; i < move.count; i++) {
			head.addMut(move.direction);
			if (!head.isNeighbour(tail)) {
				tail.addMut(tail.subtract(head).normalizeMut());
				tailTrail.add(tail.toString());
			}
		}
	}

	return tailTrail.size;
};

await task(p1, packageJson.aoc); // 6023 ~1.95ms
