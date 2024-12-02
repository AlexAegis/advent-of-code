import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { isReportSafe, parseReports } from './parse.js';

export const p2 = (input: string): number =>
	parseReports(input).filter((report) => {
		let safe = isReportSafe(report);
		for (let i = 0; i < report.length && !safe; i++) {
			const copyOfReport = [...report];
			copyOfReport.splice(i, 1);
			safe = isReportSafe(copyOfReport);
		}
		return safe;
	}).length;

await task(p2, packageJson.aoc); // 364 ~0.90ms
