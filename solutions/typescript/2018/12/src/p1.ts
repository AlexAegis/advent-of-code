import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpreter.function.js';

export const p1 = (input: string): number | undefined => {
	const cave = interpreter(input);
	if (cave) {
		cave.normalize();
		// console.log(`i: 0 cave: ${cave.toString()}`);
		for (let i = 0; i < 20; i++) {
			let nextGen = '..';
			for (let p = 2; p < cave.row.length - 2; p++) {
				const char = cave.row.charAt(p);
				if (cave.rules.indexOf(cave.row.substr(p - 2, 5)) >= 0) {
					nextGen += char === '.' ? '#' : '.';
				} else {
					nextGen += char;
				}
			}
			cave.row = nextGen;
			cave.normalize();
			// console.log(`i: ${i + 1} cave: ${cave.toString()}`);
		}
		return cave.score();
	} else {
		return undefined;
	}
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 3230 ~0.8ms
}
