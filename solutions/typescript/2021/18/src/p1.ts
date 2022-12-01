import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
} from './model/snailfish-number.js';

export const p1 = (input: string): number => {
	const snailfishNumbers = input.lines().map(parseSnailfishNumber);
	const sum = addSnailfishNumbers(...snailfishNumbers);
	return getMagnitude(sum);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 4184 ~70.82ms
}
