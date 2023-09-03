import { Interval, INTERVAL_CLOSED, split } from '@alexaegis/advent-of-code-lib';

export type Ticket = number[];

export interface TicketObservation {
	fieldRanges: Map<string, Interval[]>;
	myTicket: number[];
	nearbyTickets: number[][];
}

export const parse = (input: string): TicketObservation => {
	const lines = split(input);
	const fieldRanges = new Map<string, Interval[]>();
	let myTicket: Ticket = [];
	const nearbyTickets: Ticket[] = [];
	let currentSection: undefined | string;
	for (const line of lines) {
		if (line.endsWith(':')) {
			currentSection = line;
			continue;
		}
		switch (currentSection) {
			case undefined: {
				const [category, value] = line.splitIntoStringPair(': ');
				const ranges = value.splitIntoStringPair(' or ').map((rawRange) => {
					const [low, high] = rawRange.splitIntoStringPair('-');
					return Number.parseInt(low, 10).interval(
						Number.parseInt(high, 10),
						INTERVAL_CLOSED,
					);
				});
				fieldRanges.set(category, ranges);

				break;
			}
			case 'your ticket:': {
				myTicket = line.split(',').map((v) => Number.parseInt(v, 10));

				break;
			}
			case 'nearby tickets:': {
				nearbyTickets.push(line.split(',').map((v) => Number.parseInt(v, 10)));

				break;
			}
			// No default
		}
	}
	return { fieldRanges, myTicket, nearbyTickets };
};
