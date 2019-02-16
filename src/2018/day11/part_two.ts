import { Coord } from './coord.class';
import { range } from './range.generator';
import * as WorkerPool from 'workerpool';

export type Result = { coord: Coord; sum: number; size: number };

export const runner = async (input: number = 8561): Promise<string> =>
	new Promise<string>(async res => {
		const mapSize = 300;
		let pool = WorkerPool.pool();
		let promises = [];
		for (let coord of range({ from: 1, to: mapSize }, { from: 1, to: mapSize })) {
			promises.push(
				pool.exec(
					(cx: number, cy: number, mapSize: number, input: number) => {
						let calc = (x: number, y: number) => {
							let rackID = x + 10;
							let power = rackID * y;
							power += input;
							power *= rackID;
							power = Math.floor((power % 1000) / 100);
							power -= 5;
							return power;
						};
						let maxSize = Math.min(cx, cy, mapSize - cx, mapSize - cy);
						let acc = { coord: { x: cx, y: cy }, sum: -Infinity, size: -Infinity };
						for (let size = 0; size < maxSize; size++) {
							let lol: Array<{ x: number; y: number }> = [];
							for (let x = cx; x <= cx + size; x++) {
								for (let y = cy; y <= cy + size; y++) {
									lol.push({ x: x, y: y });
								}
							}
							let sum = lol.map(c => calc(c.x, c.y)).reduce((acc, next) => (acc += next), 0);
							if (sum > acc.sum) {
								acc.size = size + 1;
								acc.sum = sum;
							}
						}
						return acc;
					},
					[coord.x, coord.y, mapSize, input]
				)
			);
		}

		let result: Array<Result> = await Promise.all(promises);
		let max = result.reduce((acc, next) => {
			if (!acc) {
				acc = { coord: undefined, sum: -Infinity, size: -Infinity };
			}
			if (next.sum > acc.sum) {
				acc.coord = next.coord;
				acc.size = next.size;
				acc.sum = next.sum;
			}
			return acc;
		});
		pool.terminate();
		res(`${max.coord.x},${max.coord.y},${max.size} (${max.sum})`);
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 236,146,12 (160) ~63007ms on i7-8700k@4.8Ghz all 6 cores 100%
}
