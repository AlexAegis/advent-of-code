import { bench, read } from '@lib';
import { identity } from '@lib/functions';
import { day, year } from '.';
import { ClosingTag, closingTagMap, isOpeningTag, OpeningTag } from './model';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2429644557 ~0.30ms
}
