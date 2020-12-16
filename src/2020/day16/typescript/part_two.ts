import { bench, Range, read } from '@lib';
import { mult } from '@lib/math';
import { day, year } from '.';
import { parse, Ticket } from './parse.function';
import { invalidFields } from './part_one';

export interface CertainField {
	index: number;
	value: number;
	fieldName: string;
}

export interface UncertainField extends Omit<CertainField, 'fieldName'> {
	possibleFieldNames: string[];
	fieldName?: string;
}

export type ClarifiedTicket = CertainField[];

export const clarifyFields = (
	ticket: Ticket,
	otherTickets: Ticket[],
	fieldRanges: Map<string, Range[]>
): ClarifiedTicket => {
	const categoryRangeEntries = [...fieldRanges.entries()];
	const myFields = ticket.map((value, index) => {
		const otherTicketsFields = otherTickets.map((ticket) => ticket[index]);
		const possibleFieldNames = categoryRangeEntries
			.filter(([, ranges]) =>
				otherTicketsFields.every((ticketField) =>
					ranges.some((range) => range.high >= ticketField && range.low <= ticketField)
				)
			)
			.map((p) => p[0]);
		return { index, value, possibleFieldNames } as UncertainField;
	});

	// Finding which field is which
	const certainFields = new Set<string>();
	// While there are uncertain fields
	while (myFields.some((field) => field.possibleFieldNames.length)) {
		// Those that are certain, collect
		for (const myField of myFields.filter((field) => field.possibleFieldNames.length === 1)) {
			myField.fieldName = myField.possibleFieldNames[0];
			certainFields.add(myField.fieldName);
		}

		// And take out from other field name considerations
		for (const field of myFields) {
			field.possibleFieldNames = field.possibleFieldNames.filter(
				(possibleFieldName) => !certainFields.has(possibleFieldName)
			);
		}
	}

	return myFields as ClarifiedTicket;
};

export const getMyClarifiedTicket = (input: string): ClarifiedTicket => {
	const { myTicket, fieldRanges, nearbyTickets } = parse(input);
	const validTickets = nearbyTickets.filter(
		(ticket) => invalidFields(ticket, fieldRanges).length === 0
	);
	return clarifyFields(myTicket, validTickets, fieldRanges);
};

export const runner = (input: string): number =>
	getMyClarifiedTicket(input)
		.filter((p) => p.fieldName?.startsWith('departure'))
		.map((p) => p.value)
		.reduce(mult, 1);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3173135507987 ~1.79ms
}
