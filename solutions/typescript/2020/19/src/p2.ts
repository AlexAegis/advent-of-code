import { bench, read } from '@alexaegis/advent-of-code-lib';
import { memoize } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const matchRule = (
	line: string,
	rules: Map<number, number[][] | string>,
	ruleIndex: number,
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

	return words.count((word) => memoizedMatchRule(word, ruleBook, 0)[0] === word.length);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 316 ~480.55ms
}
