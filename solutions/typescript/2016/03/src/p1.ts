import { split } from '@alexaegis/advent-of-code-lib';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { isTriangle, Triangle } from './is-triangle.function.js';

export const p1 = (input: string): number => {
	const splitOptions = { toIntOptions: { safe: true } };
	return split(input)
		.map((line) => line.splitToInt(splitOptions) as Triangle)
		.count(isTriangle);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 869 ~0.9385ms
}
