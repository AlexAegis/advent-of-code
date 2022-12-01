import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
import { divisible } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number =>
	split(input)
		.map((line) => {
			const [big, small] = line.splitToInt().desc().bubbleFindPair(divisible);
			return big / small;
		})
		.sum();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 250 ~0.0505ms
}
