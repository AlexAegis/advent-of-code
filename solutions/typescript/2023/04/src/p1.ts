import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p1 = (input: string): number =>
	input
		.lines(false)
		.map(parse)
		.map((card) => {
			let score = 0;
			for (const pulledNumber of card.pulledNumbers) {
				if (card.winningNumbers.includes(pulledNumber)) {
					score = score * 2 || 1;
				}
			}
			return score;
		})
		.sum();

await task(p1, packageJson.aoc); // 20107 ~4.36ms
