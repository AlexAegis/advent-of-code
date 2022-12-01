import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.split(/\r?\n\r?\n/)
		.map((group) => new Set(group.replace(/\r?\n/g, '')).size)
		.reduce(sum);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 6542 ~1ms
}
