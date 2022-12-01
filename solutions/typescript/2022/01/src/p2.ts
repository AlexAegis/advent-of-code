import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	input
		.splitToIntAndGroupByWhitespace()
		.map((group) => group.sum())
		.max(3)
		.sum();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 199357 ~0.25ms
}
