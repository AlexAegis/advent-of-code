import { bench, read } from '@alexaegis/advent-of-code-lib';
import { identity } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { ClosingTag, closingTagMap, isOpeningTag, OpeningTag } from './model/index.js';

const scoreMap: Record<ClosingTag, number> = {
	')': 1,
	']': 2,
	'}': 3,
	'>': 4,
};

const fixLine = (line: string): ClosingTag[] | undefined => {
	const chars = [...line] as (OpeningTag | ClosingTag)[];
	const openStack: OpeningTag[] = [];
	for (const char of chars) {
		if (isOpeningTag(char)) {
			openStack.push(char);
		} else {
			const lastOpeningTag = openStack.pop();
			if (lastOpeningTag && char !== closingTagMap[lastOpeningTag]) {
				return undefined; // Corrupt, not fixable
			}
		}
	}
	return openStack.reverse().map((openTag) => closingTagMap[openTag]);
};

export const runner = (input: string): number =>
	input
		.lines()
		.map(fixLine)
		.filter(identity)
		.map((fixedLine) => fixedLine.reduce((acc, next) => acc * 5 + scoreMap[next], 0))
		.median();

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 2429644557 ~0.30ms
}
