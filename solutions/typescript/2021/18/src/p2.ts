import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import {
	addSnailfishNumbers,
	getMagnitude,
	parseSnailfishNumber,
} from './model/snailfish-number.js';

export const p2 = (input: string): number =>
	input
		.lines()
		.pairsWith()
		.map((pair) => getMagnitude(addSnailfishNumbers(...pair.map(parseSnailfishNumber))))
		.max();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 4731 ~1053.30ms
}
