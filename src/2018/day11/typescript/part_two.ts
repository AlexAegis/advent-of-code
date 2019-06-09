import { bench } from '@root';
import * as WorkerPool from 'workerpool';
import { inputs } from '.';
import { range } from './functions/range.generator';
import { Coord } from './model/coord.class';

export interface Result {
	coord: Coord | undefined;
	sum: number;
	size: number;
}

export const runner = async (input: number): Promise<string> => {
	const _mapSize = 300;
	const pool = WorkerPool.pool();
	const promises = [];
	for (const coord of range({ from: 1, to: _mapSize }, { from: 1, to: _mapSize })) {
		promises.push(
			pool.exec(
				(cx: number, cy: number, mapSize: number, i: number) => {
					const calc = (x: number, y: number) => {
						const rackID = x + 10;
						let power = rackID * y;
						power += i;
						power *= rackID;
						power = Math.floor((power % 1000) / 100);
						power -= 5;
						return power;
					};
					const maxSize = Math.min(cx, cy, mapSize - cx, mapSize - cy);
					const acc = { coord: { x: cx, y: cy }, sum: -Infinity, size: -Infinity };
					for (let size = 0; size < maxSize; size++) {
						const lol: Array<{ x: number; y: number }> = [];
						for (let x = cx; x <= cx + size; x++) {
							for (let y = cy; y <= cy + size; y++) {
								lol.push({ x, y });
							}
						}
						const sum = lol.map(c => calc(c.x, c.y)).reduce((a, n) => (a += n), 0);
						if (sum > acc.sum) {
							acc.size = size + 1;
							acc.sum = sum;
						}
					}
					return acc;
				},
				[coord.x, coord.y, _mapSize, input]
			)
		);
	}

	const result: Result[] = await Promise.all(promises);
	const max = result.reduce((acc, next) => {
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
	return `${max.coord ? max.coord.x + ', ' + max.coord.y : 'undefined'},${max.size} (${max.sum})`;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(() => inputs.two.input, runner)}`))(); // 236,146,12 (160) ~63007ms
}
