import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { createUpdateComparator, parse } from './parse.js';

export const p1 = (input: string): number => {
	const p = parse(input);
	const comparator = createUpdateComparator(p.rules);
	return p.updates
		.filter((update) => {
			const sortedUpdate = [...update.pages].sort(comparator);
			return sortedUpdate.join(',') === update.pages.join(',');
		})
		.map((update) => update.pages[Math.floor(update.pages.length / 2)])
		.sum();
};

await task(p1, packageJson.aoc); // 4569 ~24.54ms
