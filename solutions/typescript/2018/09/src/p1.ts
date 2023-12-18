import { Deque, rotateDeque, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { interpreter } from './interpreter.function.js';

export const p1 = (input: string): number => {
	const setup = interpreter(input);
	const ring: Deque<number> = new Deque<number>([], 100_000);
	const score: number[] = Array.from<number>({ length: setup.players }).fill(0);
	for (let marble = 1; marble <= setup.lastMarble; marble++) {
		if (marble % 23 === 0) {
			rotateDeque(ring, 7);
			score[marble % setup.players] += marble + (ring.popBack() ?? 0);
			rotateDeque(ring, -1);
		} else {
			rotateDeque(ring, -1);
			ring.pushBack(marble);
		}
	}
	return [...score].reduce((acc, next) => (acc < next ? next : acc));
};

await task(p1, packageJson.aoc); // 361466 ~1.27ms
