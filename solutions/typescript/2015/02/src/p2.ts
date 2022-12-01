import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import { asc, dup, mult, sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	split(input)
		.map((line) => line.split('x').map((c) => parseInt(c, 10)))
		.map((s) => s.reduce(mult, 1) + s.sort(asc).slice(0, 2).map(dup).reduce(sum, 0))
		.reduce(sum, 0);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 3842356 ~2.4ms
}
