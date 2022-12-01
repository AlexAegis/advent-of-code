import { bench, read } from '@alexaegis/advent-of-code-lib';
import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = async (input: string) => {
	return 0;
};

if (process.env.RUN) {
	console.log(`Result: ${await runner('')}`)
	// const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	// console.log(`Result: ${await benchTask(p1, resources)}`); // 0 ~0ms
}
