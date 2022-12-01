import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { identity } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { ClosingTag, closingTagMap, isOpeningTag, OpeningTag } from './model/index.js';

const scoreMap: Record<ClosingTag, number> = {
	')': 3,
	']': 57,
	'}': 1197,
	'>': 25137,
};

export const getFirstCorruptTag = (line: string): ClosingTag | undefined => {
	const chars = [...line] as (OpeningTag | ClosingTag)[];
	const openStack: OpeningTag[] = [];
	for (const char of chars) {
		if (isOpeningTag(char)) {
			openStack.push(char);
		} else {
			const lastOpeningTag = openStack.pop();
			if (lastOpeningTag && char !== closingTagMap[lastOpeningTag]) {
				return char;
			}
		}
	}
	return undefined;
};

export const p1 = (input: string): number =>
	input
		.lines()
		.map(getFirstCorruptTag)
		.filter(identity)
		.map((closingTag) => scoreMap[closingTag])
		.sum();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 193275 ~0.27ms
}
