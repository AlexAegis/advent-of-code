import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse.function';

const score = (polymer: string[]): number => {
	const elementCounts = polymer.reduce((acc, n) => {
		acc.set(n, (acc.get(n) ?? 0) + 1);
		return acc;
	}, new Map<string, number>());
	const sortedCounts = [...elementCounts.entries()].sort((a, b) => a[1] - b[1]);
	return sortedCounts[sortedCounts.length - 1][1] - sortedCounts[0][1];
};

/**
 * Initial naive solution
 */
export const runner = (input: string): number => {
	const { polymer, rules } = parse(input);
	let p = [...polymer];
	for (let generation = 0; generation < 10; generation++) {
		const next: string[] = [];
		for (let i = 0; i < p.length - 1; i = i + 1) {
			next.push(p[i]);
			const result = rules.get(`${p[i]}${p[i + 1]}`);
			if (result) {
				next.push(result);
			} else {
				next.push(p[i + 1]);
			}
		}
		next.push(p[p.length - 1]);
		p = next;
	}
	return score(p);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 2703 ~1.82ms
}
