import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.split('')
		.filter((c) => c === '(' || c === ')')
		.reduce((a, n) => a + (n === '(' ? 1 : -1), 0);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 74 ~0.5ms
}
