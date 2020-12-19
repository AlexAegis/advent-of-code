import { bench, Range, read } from '@lib';
import { sum } from '@lib/math';
import { day, year } from '.';
import { parse } from './parse.function';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 27870 ~0.60ms
}
