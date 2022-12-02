import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpreter.function.js';
import { Deque } from './model/deque.class.js';

export const p1 = (input: string): number => {
	const setup = interpreter(input);
	const ring: Deque<number> = new Deque<number>(undefined, 0);
	const score: number[] = new Array<number>(setup.players).fill(0);
	for (let marble = 1; marble <= setup.lastMarble; marble++) {
		if (marble % 23 === 0) {
			ring.rotate(7);
			score[marble % setup.players] += marble + (ring.pop() || 0);
			ring.rotate(-1);
		} else {
			ring.rotate(-1);
			ring.push(marble);
		}
	}
	return [...score].reduce((acc, next) => (acc < next ? next : acc));
};

await task(p1, packageJson.aoc); // 361466 ~9ms
