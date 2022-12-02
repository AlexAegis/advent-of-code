import { Range, task } from '@alexaegis/advent-of-code-lib';
import { sum } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

export const checkField = (ticketField: number, fieldRanges: Range[][]): boolean =>
	fieldRanges.some((ranges) =>
		ranges.some((range) => range.high >= ticketField && range.low <= ticketField)
	);

export const invalidFields = (ticket: number[], rangeMap: Map<string, Range[]>): number[] => {
	const ranges = [...rangeMap.values()];
	return ticket.filter((field) => !checkField(field, ranges));
};

export const p1 = (input: string): number => {
	const { fieldRanges, nearbyTickets } = parse(input);
	return nearbyTickets.flatMap((ticket) => invalidFields(ticket, fieldRanges)).reduce(sum);
};

await task(p1, packageJson.aoc); // 27870 ~0.60ms
