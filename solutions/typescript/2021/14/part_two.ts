import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse.function';

const initialPairs = (polymer: string): Map<string, number> =>
	[...polymer]
		.slideWindow(2)
		.reduce((a, n) => a.update(n.join(''), (v = 0) => v + 1), new Map<string, number>());

const initialScores = (polymer: string): Map<string, number> =>
	[...polymer].reduce((a, n) => a.update(n, (score = 0) => score + 1), new Map<string, number>());

export const runner = (input: string): number => {
	const { polymer, rules } = parse(input);
	let pairMap = initialPairs(polymer);
	const scoreMap = initialScores(polymer);

	for (let generation = 0; generation < 40; generation++) {
		const nextPairMap = pairMap.copy();
		for (const [left, right] of rules) {
			const result = pairMap.get(left) ?? 0;
			if (result > 0) {
				nextPairMap.update(left, (v = 0) => v - result);
				nextPairMap.update(`${left[0]}${right}`, (v = 0) => v + result);
				nextPairMap.update(`${right}${left[1]}`, (v = 0) => v + result);
				scoreMap.update(right, (score = 0) => score + result);
			}
		}
		pairMap = nextPairMap;
	}

	const sortedCounts = scoreMap
		.intoArray()
		.map(([, score]) => score)
		.asc();
	return sortedCounts.last() - sortedCounts.first();
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2984946368465 ~1.13ms
}
