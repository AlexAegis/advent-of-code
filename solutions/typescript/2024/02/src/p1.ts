import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { isReportSafe, parseReports } from './parse.js';

export const p1 = (input: string): number => parseReports(input).filter(isReportSafe).length;

await task(p1, packageJson.aoc); // 299 ~0.58ms
