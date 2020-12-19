import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse.function';

export const matchRule = (
	line: string,
	ruleBook: Map<number, number[][] | string>,
	ruleIndex: number,
	wordIndex = 0
): number | undefined => {
	const currentRule = ruleBook.get(ruleIndex)!;
	if (typeof currentRule === 'string') {
		return line[wordIndex] === currentRule ? wordIndex + 1 : undefined;
	} else {
		for (const rule of currentRule) {
			let i = wordIndex;
			let failed = false;
			for (const r of rule) {
				const nextIndex = matchRule(line, ruleBook, r, i);
				if (nextIndex === undefined) {
					failed = true;
					break;
				} else {
					i = nextIndex;
				}
			}
			if (!failed) {
				return i;
			}
		}
	}
	return undefined;
};

export const runner = (input: string): number => {
	const { ruleBook, words } = parse(input);
	return words.filter((word) => matchRule(word, ruleBook, 0) === word.length).length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 208 ~2.49ms
}
