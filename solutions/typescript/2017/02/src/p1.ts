import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	split(input)
		.map((line) => {
			const e = line.splitToInt();
			const min = e.min();
			const max = e.max();
			return max - min;
		})
		.sum();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 47136 ~0.0356ms
}
