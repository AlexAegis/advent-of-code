import { reader } from './reader.function';
import { Deque } from './deque.class';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const setup = await reader(input);
		const ring: Deque<number> = new Deque<number>(undefined, 0);
		const score: Array<number> = new Array<number>(setup.players).fill(0);
		for (let marble = 1; marble <= setup.lastMarble * 100; marble++) {
			if (marble % 23 === 0) {
				ring.rotate(7);
				score[marble % setup.players] += marble + ring.pop();
				ring.rotate(-1);
			} else {
				ring.rotate(-1);
				ring.push(marble);
			}
		}
		res([...score].reduce((acc, next) => (acc < next ? next : acc)));
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 2945918550 ~346ms
}
