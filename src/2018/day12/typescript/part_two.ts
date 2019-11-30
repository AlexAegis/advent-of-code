import { bench, read } from '@lib';
import { day, year } from '.';
import { interpreter } from './interpreter.function';

export const runner = (input: string): number | undefined => {
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
				if (cave.rules.indexOf(cave.row.substr(p - 2, 5)) >= 0) {
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
				counts.slice(counts.length - 4, counts.length).every((next, _, arr) => next === arr[0])
			) {
				// console.log(`Stabilized, extrapolating to 50000000000`);
				scores.push(
					scores[scores.length - 1] +
						(scores[scores.length - 1] - scores[scores.length - 2]) * (50000000000 - i - 1)
				);
				break;
			}
		}
		return scores.pop();
	} else {
		return undefined;
	}
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 4400000000304 ~11ms
}
