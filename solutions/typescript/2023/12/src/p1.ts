import { cartesianCombinations, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

interface SprintLog {
	/**
	 * `?` unknown
	 * `.` operational
	 * `#` damaged
	 */
	log: string;
	criteria: number[];
	criteriaRegExp: RegExp;
}

export const criteriaToRegExp = (criteria: number[]): RegExp =>
	new RegExp('^\\.*' + criteria.map((brokenCount) => `#{${brokenCount}}`).join('\\.+') + '\\.*$');

function generateVariations(damagedLog: string, criteria: RegExp): string[] {
	const variants = [...damagedLog].map((entry) => (entry === '?' ? ['#', '.'] : [entry]));
	// const variationCount = variants.map((ev) => ev.length).product();
	return cartesianCombinations(...variants)
		.map((combination) => combination.join(''))
		.filter((combination) => criteria.test(combination));
}

export const p1 = (input: string): number =>
	input
		.lines(false)
		.map((line) => {
			const [log, critRaw] = line.splitIntoStringPair(' ');
			const crit = critRaw.splitToInt({ delimiter: /,/ });
			return { log, criteria: crit, criteriaRegExp: criteriaToRegExp(crit) } as SprintLog;
		})
		.map((spring) => generateVariations(spring.log, spring.criteriaRegExp).length)

		.sum();

await task(p1, packageJson.aoc); // 7118 ~0ms
