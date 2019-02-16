import { interval, Subject } from 'rxjs';
import { takeUntil, take, flatMap, tap } from 'rxjs/operators';
import { Coord } from './coord.class';
import { range } from './range.generator';
import * as WorkerPool from 'workerpool';

export const runner = async (input: number = 8561): Promise<string> =>
	new Promise<string>(async res => {
		let map: Map<string, number> = new Map();

		for (let coord of range({ from: 1, to: 300 }, { from: 1, to: 300 })) {
			let rackID = coord.x + 10;
			let powerLevel = rackID * coord.y;
			powerLevel += input;
			powerLevel *= rackID;
			powerLevel = Math.floor((powerLevel % 1000) / 100);
			powerLevel -= 5;
			map.set(coord.toString(), powerLevel);
		}

		let max = [...range({ from: 1, to: 300 }, { from: 1, to: 300 })].reduce(
			(acc, next) => {
				let maxSize = Math.min(next.x, next.y, 300 - next.x, 300 - next.y);
				for (let size = 0; size < maxSize; size++) {
					let sum = [...range({ from: next.x, to: next.x + size }, { from: next.y, to: next.y + size })]
						.map(c => map.get(c.toString()))
						.reduce((acc, next) => (acc += next), 0);
					if (sum > acc.sum) {
						acc.coord = next;
						acc.size = size;
						acc.sum = sum;
					}
				}
				return acc;
			},
			{ coord: undefined as Coord, size: -Infinity, sum: -Infinity }
		);
		res(`${max.coord},${max.size} (${max.sum})`);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 21,37 (30) ~165ms
}
