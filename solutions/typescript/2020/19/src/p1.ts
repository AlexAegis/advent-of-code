import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const matchRule = (
	line: string,
	ruleBook: Map<number, number[][] | string>,
	ruleIndex: number,
	wordIndex = 0,
): number | undefined => {
	const currentRule = ruleBook.get(ruleIndex);

	if (currentRule === undefined) {
		return undefined;
	}

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

export const p1 = (input: string): number => {
	const { ruleBook, words } = parse(input);
	return words.count((word) => matchRule(word, ruleBook, 0) === word.length);
};

await task(p1, packageJson.aoc); // 208 ~2.49ms
