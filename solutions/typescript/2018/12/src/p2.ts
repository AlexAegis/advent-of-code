import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpreter } from './interpreter.function.js';

export const p2 = (input: string): number | undefined => {
	const cave = interpreter(input);
	if (cave) {
		cave.normalize();
		// console.log(`i: 0 cave: ${cave.toString()}`);
		const counts = [];
		const scores: number[] = [];
		for (let i = 0; i < 200; i++) {
			let nextGen = '..';
			for (let p = 2; p < cave.row.length - 2; p++) {
				const char = cave.row.charAt(p);
				if (cave.rules.includes(cave.row.slice(p - 2, p + 3))) {
					nextGen += char === '.' ? '#' : '.';
				} else {
					nextGen += char;
				}
			}
			cave.row = nextGen;
			cave.normalize();
			counts.push(cave.count());
			scores.push(cave.score());
			// console.log(`i: ${i + 1} cave: ${cave.toString()}`);
			if (
				counts.length > 4 &&
				counts.slice(-4, counts.length).every((next, _, arr) => next === arr[0])
			) {
				// console.log(`Stabilized, extrapolating to 50000000000`);
				scores.push(
					scores.last() + (scores.last() - scores.last(1)) * (50_000_000_000 - i - 1),
				);
				break;
			}
		}
		return scores.pop();
	} else {
		return undefined;
	}
};

await task(p2, packageJson.aoc); // 4400000000304 ~11ms
