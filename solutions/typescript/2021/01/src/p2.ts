import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	input
		.splitToInt()
		.slideWindow(3)
		.map((window) => window.sum())
		.slideWindow()
		.count(([a, b]) => a < b);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 1395 ~0.39ms
}
