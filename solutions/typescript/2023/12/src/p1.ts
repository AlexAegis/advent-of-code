import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { calculateVariations, parse } from './parse.js';

export const p1 = (input: string): number =>
	parse(input)
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

await task(p1, packageJson.aoc); // 7118 ~30.83ms
