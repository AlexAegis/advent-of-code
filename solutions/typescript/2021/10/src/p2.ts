import { task } from '@alexaegis/advent-of-code-lib';
import { identity } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json';
import { closingTagMap, isOpeningTag, type ClosingTag, type OpeningTag } from './model/index.js';

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

export const p2 = (input: string): number =>
	input
		.lines()
		.map(fixLine)
		.filter(identity)
		.map((fixedLine) => fixedLine.reduce((acc, next) => acc * 5 + scoreMap[next], 0))
		.median();

await task(p2, packageJson.aoc); // 2429644557 ~0.30ms
