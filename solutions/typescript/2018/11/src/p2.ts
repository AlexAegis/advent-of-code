import { task } from '@alexaegis/advent-of-code-lib';
import type { Vec2Like } from '@alexaegis/advent-of-code-lib/model';
import * as WorkerPool from 'workerpool';
import packageJson from '../package.json';
import { range } from './functions/range.generator.js';

export interface Result {
	vec: Vec2Like | undefined;
	sum: number;
	size: number;
}

export const p2 = async (input: string): Promise<string> => {
	const serialNumber = parseInt(input, 10);
	const _mapSize = 300;
	const pool = WorkerPool.pool();
	const promises = [];
	for (const vec of range({ from: 1, to: _mapSize }, { from: 1, to: _mapSize })) {
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
					const acc = {
						vec: { x: cx, y: cy },
						sum: -Infinity,
						size: -Infinity,
					};
					for (let size = 0; size < maxSize; size++) {
						const lol: Array<{ x: number; y: number }> = [];
						for (let x = cx; x <= cx + size; x++) {
							for (let y = cy; y <= cy + size; y++) {
								lol.push({ x, y });
							}
						}
						const sum = lol.map((c) => calc(c.x, c.y)).reduce((a, n) => (a += n), 0);
						if (sum > acc.sum) {
							acc.size = size + 1;
							acc.sum = sum;
						}
					}
					return acc;
				},
				[vec.x, vec.y, _mapSize, serialNumber]
			)
		);
	}

	const result: Result[] = await Promise.all(promises);
	const max = result.reduce((acc, next) => {
		if (!acc) {
			acc = { vec: undefined, sum: -Infinity, size: -Infinity };
		}
		if (next.sum > acc.sum) {
			acc.vec = next.vec;
			acc.size = next.size;
			acc.sum = next.sum;
		}
		return acc;
	});
	pool.terminate();
	return `${max.vec ? max.vec.x + ', ' + max.vec.y : 'undefined'},${max.size} (${max.sum})`;
};

await task(p2, packageJson.aoc); // 236,146,12 (160) ~63007ms
