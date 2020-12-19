import { bench, read } from '@lib';
import { memoize } from '@lib/functions';
import { day, year } from '.';
import { parse } from './parse.function';

export const matchRule = (
	line: string,
	rules: Map<number, number[][] | string>,
	ruleIndex = 0,
	wordIndex = 0
): number[] => {
	const rule = rules.get(ruleIndex)!;
	if (typeof rule === 'string') {
		return line[wordIndex] === rule ? [wordIndex + 1] : [];
	} else {
		return rule.flatMap((r) =>
			r.reduce(
				(acc, n) => {
					return acc.flatMap((ir) => memoizedMatchRule(line, rules, n, ir));
				},
				[wordIndex]
			)
		);
	}
};

const cache = new Map();
const memoizedMatchRule = memoize(matchRule, cache);

export const runner = (input: string): number => {
	const { ruleBook, words } = parse(input);

	cache.clear(); // For benchmarking

	ruleBook.set(8, [[42], [42, 8]]);
	ruleBook.set(11, [
		[42, 31],
		[42, 11, 31],
	]);

	return words.filter((word) => memoizedMatchRule(word, ruleBook, 0)[0] === word.length).length;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 316 ~480.55ms
}
