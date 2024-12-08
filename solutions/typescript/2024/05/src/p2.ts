import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { createUpdateComparator, parse } from './parse.js';

export const p2 = (input: string): number => {
	const p = parse(input);
	const comparator = createUpdateComparator(p.rules);
	return p.updates
		.filterMap((update) => {
			const sortedUpdate = [...update.pages].sort(comparator);
			return sortedUpdate.join(',') !== update.pages.join(',') ? sortedUpdate : undefined;
		})
		.map((pages) => pages[Math.floor(pages.length / 2)])
		.sum();
};

await task(p2, packageJson.aoc); // 6456 ~24.37ms
