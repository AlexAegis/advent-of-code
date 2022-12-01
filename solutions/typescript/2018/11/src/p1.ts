import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { range } from './functions/range.generator.js';

export const rackDirections = [
	new Vec2(0, 0),
	new Vec2(0, 1),
	new Vec2(0, 2),
	new Vec2(1, 0),
	new Vec2(1, 1),
	new Vec2(1, 2),
	new Vec2(2, 0),
	new Vec2(2, 1),
	new Vec2(2, 2),
];

export const p1 = (input: string): string => {
	const serialNumber = parseInt(input, 10);
	const map: Map<string, number> = new Map();
	for (const vec of range({ from: 1, to: 300 }, { from: 1, to: 300 })) {
		const rackID = vec.x + 10;
		let powerLevel = rackID * vec.y;
		powerLevel += serialNumber;
		powerLevel *= rackID;
		powerLevel = Math.floor((powerLevel % 1000) / 100);
		powerLevel -= 5;
		map.set(vec.toString(), powerLevel);
	}

	const max = [...range({ from: 1, to: 298 }, { from: 1, to: 298 })].reduce(
		(acc, next) => {
			const sum = rackDirections
				.map((rd) => rd.clone().addMut(next))
				.map((c) => map.get(c.toString()) || 0)
				.reduce((a, n) => (a += n), 0);
			if (sum > acc.sum) {
				acc.vec = next;
				acc.sum = sum;
			}
			return acc;
		},
		{ vec: undefined as unknown as Vec2, sum: -Infinity }
	);
	return `${max.vec} (${max.sum})`;
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 21,37 (30) ~165ms
}
