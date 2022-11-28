import { bench, Range, read } from '@alexaegis/advent-of-code-lib';
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

export const runner = (input: string): number => {
	const { fieldRanges, nearbyTickets } = parse(input);
	return nearbyTickets.flatMap((ticket) => invalidFields(ticket, fieldRanges)).reduce(sum);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 27870 ~0.60ms
}
