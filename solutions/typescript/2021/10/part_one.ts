import { bench, read } from '@lib';
import { identity } from '@lib/functions';
import { day, year } from '.';
import { ClosingTag, closingTagMap, isOpeningTag, OpeningTag } from './model';

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

export const runner = (input: string): number =>
	input
		.lines()
		.map(getFirstCorruptTag)
		.filter(identity)
		.map((closingTag) => scoreMap[closingTag])
		.sum();

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 193275 ~0.27ms
}
