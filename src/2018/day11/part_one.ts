import { Coord } from './coord.class';
import { range } from './range.generator';

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

		let max = [...range({ from: 1, to: 298 }, { from: 1, to: 298 })].reduce(
			(acc, next) => {
				let sum = [...next].map(c => map.get(c.toString())).reduce((acc, next) => (acc += next), 0);
				if (sum > acc.sum) {
					acc.coord = next;
					acc.sum = sum;
				}
				return acc;
			},
			{ coord: undefined as Coord, sum: -Infinity }
		);
		res(`${max.coord} (${max.sum})`);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 21,37 (30) ~165ms
}
