import { task } from '@alexaegis/advent-of-code-lib';
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

function calculateVariations(damagedLog: string, criteria: number[]): number {
	const totalVariationCount = [...damagedLog].map((entry) => (entry === '?' ? 2 : 1)).product();
	const minlen = criteria.sum() + criteria.length - 1;
	// const variationCount = variants.map((ev) => ev.length).product();
	return totalVariationCount ^ minlen;
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
		.map((spring) => calculateVariations(spring.log, spring.criteria))

		.sum();

await task(p2, packageJson.aoc); // 7118 ~0ms
