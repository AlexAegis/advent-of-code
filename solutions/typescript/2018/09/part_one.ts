import { bench, read } from '@lib';
import { day, year } from '.';
import { interpreter } from './interpreter.function';
import { Deque } from './model/deque.class';

export const runner = (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 361466 ~9ms
}
