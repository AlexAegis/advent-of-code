import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { calculateVariations, parse, type SpringLog } from './parse.js';

const unfoldEntry =
	(times: number) =>
	(entry: SpringLog): SpringLog => ({
		...entry,
		log: Array.from({ length: times })
			.map(() => entry.log)
			.join('?'),
		criteria: Array.from({ length: times }).flatMap(() => entry.criteria),
	});

export const p2 = (input: string): number =>
	parse(input)
		.map(unfoldEntry(5))
		.map((entry) => {
			const [currentCriteria, ...remainingCriteria] = entry.criteria;
			if (!currentCriteria) {
				throw new Error('no criteria for line');
			}
			return calculateVariations({
				currentCriteria,
				currentOriginalCriteria: currentCriteria,
				rebuiltLog: '',
				remainingCriteria,
				remainingDamagedLog: entry.log,
			});
		})
		.sum();

await task(p2, packageJson.aoc); // 7030194981795 ~539.06ms
