import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number =>
	input
		.split(/\r?\n/)
		.filter((n) => !!n)
		.map((n) => Math.floor(parseInt(n, 10) / 3) - 2)
		.reduce((s, n) => s + n, 0);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc, 'input.2.txt');
	console.log(`Result: ${await benchTask(p1, resources)}`); // 3399947 ~0.3ms
}
