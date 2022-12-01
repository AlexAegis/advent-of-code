import { split } from '@alexaegis/advent-of-code-lib';
import { min, sum } from '@alexaegis/advent-of-code-lib/math';

import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = async (input: string): Promise<number> =>
	split(input)
		.map((line) => line.split('x').map((c) => parseInt(c, 10)))
		.map(([l, w, h]) => [l * w, w * h, h * l])
		.map((sides) => sides.reduce(min) + sides.reduce(sum) * 2)
		.reduce(sum, 0);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 3803038 ~2ms
}
