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

export const p2 = (input: string): number =>
	input
		.lines(false)

		.map((line) => {
			console.log(line);
			const [log, critRaw] = line.splitIntoStringPair(' ');
			const crit = critRaw.splitToInt({ delimiter: /,/ });
			//crit = Array.from({ length: 5 }).flatMap(() => crit);
			const multipliedLog = log;
			//multipliedLog = Array.from({ length: 5 })
			//	.map(() => log)
			//	.join('?');
			return {
				log: multipliedLog,
				criteria: crit,
				criteriaRegExp: criteriaToRegExp(crit),
			} as SprintLog;
		})
		.tap((a) => {
			console.log(a);
		})
		.map((spring) => generateVariations(spring.log, spring.criteriaRegExp).length)

		.sum();

await task(p2, packageJson.aoc); // 7118 ~0ms
