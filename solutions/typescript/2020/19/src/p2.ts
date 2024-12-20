import { memoize, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const matchRule = (
	line: string,
	rules: Map<number, number[][] | string>,
	ruleIndex: number,
	wordIndex = 0,
): number[] => {
	const rule = rules.get(ruleIndex);

	if (rule === undefined) {
		return [];
	}

	if (typeof rule === 'string') {
		return line[wordIndex] === rule ? [wordIndex + 1] : [];
	} else {
		return rule.flatMap((r) =>
			r.reduce(
				(acc, n) => {
					return acc.flatMap((ir) => memoizedMatchRule(line, rules, n, ir));
				},
				[wordIndex],
			),
		);
	}
};

const memoizedMatchRule = memoize(matchRule);

export const p2 = (input: string): number => {
	const { ruleBook, words } = parse(input);

	ruleBook.set(8, [[42], [42, 8]]);
	ruleBook.set(11, [
		[42, 31],
		[42, 11, 31],
	]);

	return words.count((word) => memoizedMatchRule(word, ruleBook, 0)[0] === word.length);
};

await task(p2, packageJson.aoc); // 316 ~480.55ms
