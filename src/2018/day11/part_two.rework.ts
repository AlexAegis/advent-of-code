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
						let ripple = (
							radius: number,
							xoffset: number = 0,
							yoffset: number = 0
						): Array<{ x: number; y: number }> => {
							const result = [];
							if (radius === 0) {
								result.push({ x: xoffset, y: yoffset });
							}
							for (let i = -radius; i < radius; i++) {
								result.push({ x: -radius + xoffset, y: 1 + i + yoffset });
								result.push({ x: radius + xoffset, y: i + yoffset });
								result.push({ x: i + xoffset, y: -radius + yoffset });
								result.push({ x: 1 + i + xoffset, y: radius + yoffset });
							}
							return result;
						};

						let calc = (x: number, y: number) => {
							let rackID = x + 10;
							let powerLevel = rackID * y;
							powerLevel += input;
							powerLevel *= rackID;
							powerLevel = Math.floor((powerLevel % 1000) / 100);
							powerLevel -= 5;
							return powerLevel;
						};
						let maxSize = Math.min(cx, cy, mapSize - cx, mapSize - cy);
						let acc = { coord: { x: cx, y: cy }, sum: -Infinity, size: -Infinity };
						let sum = 0;
						for (let ring = 0; ring < 7; ring++) {
							sum = ripple(ring, cx, cy)
								.map(c => calc(c.x, c.y))
								.reduce((acc, next) => (acc += next), sum);
							if (sum > acc.sum) {
								acc.size = ring * 2;
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

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 236,146,12 (160) ~63007ms on i7-8700k@4.8Ghz all 6 cores 100%
	// err 242,150,7 (154) ~207273.412ms with limit and without too
}
