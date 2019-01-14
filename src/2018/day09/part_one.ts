import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const setup = await reader(input);

		let ring: Array<number> = [];
		let current: number = 0;
		let score: Map<number, number> = new Map();

		for (let marble = 0; marble <= setup.lastMarble; marble++) {
			if (marble !== 0 && marble % 23 === 0) {
				const currentPlayer = marble % setup.players;
				if (!score.has(currentPlayer)) {
					score.set(currentPlayer, 0);
				}
				score.set(currentPlayer, score.get(currentPlayer) + marble);
				current = current - 7;
				if (current < 0) {
					current = ring.length + current;
				}
				score.set(currentPlayer, score.get(currentPlayer) + ring.splice(current - 1, 1)[0]);
			} else {
				ring.splice(current + 1, 0, marble);
				current = (current + 2) % ring.length;
			}
		}
		res([...score].reduce((acc, next) => (acc[1] < next[1] ? next : acc))[1]);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 361466 ~140ms
}
