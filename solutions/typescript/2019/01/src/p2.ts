import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const fuel = (mass: number): number => {
	const f = Math.max(Math.floor(mass / 3) - 2, 0);
	return f + (f > 0 ? fuel(f) : 0);
};

export const p2 = (input: string): number =>
	input
		.split(/\r?\n/)
		.filter((n) => !!n)
		.map((n) => fuel(parseInt(n, 10)))
		.reduce((s, n) => s + n, 0);

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc, 'input.2.txt');
	console.log(`Result: ${await benchTask(p2, resources)}`); // 5097039 ~0.36ms
}
