import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';

import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.splitToIntAndGroupByWhitespace()
		.map((group) => group.sum())
		.max();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 67450 ~0.22ms
}
