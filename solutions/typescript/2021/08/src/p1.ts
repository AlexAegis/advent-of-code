import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.lines()
		.map((line) => {
			const [, codes] = line.split(/ \| /).map((codes) => codes.split(/ /g));
			return codes.count(
				(value) =>
					value.length === 2 ||
					value.length === 3 ||
					value.length === 4 ||
					value.length === 7
			);
		})
		.sum();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 473 ~0.22ms
}
