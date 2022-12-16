import { Span, split } from '@alexaegis/advent-of-code-lib';

export type Ticket = number[];

export interface TicketObservation {
	fieldRanges: Map<string, Span[]>;
	myTicket: number[];
	nearbyTickets: number[][];
}

export const parse = (input: string): TicketObservation => {
	const lines = split(input);
	const fieldRanges = new Map<string, Span[]>();
	let myTicket: Ticket = [];
	const nearbyTickets: Ticket[] = [];
	let currentSection: undefined | string;
	for (const line of lines) {
		if (line.endsWith(':')) {
			currentSection = line;
			continue;
		}
		if (currentSection === undefined) {
			const [category, value] = line.split(': ');
			const ranges = value.split(' or ').map((rawRange) => {
				const [low, high] = rawRange.split('-');
				return parseInt(low, 10).span(parseInt(high, 10));
			});
			fieldRanges.set(category, ranges);
		} else if (currentSection === 'your ticket:') {
			myTicket = line.split(',').map((v) => parseInt(v, 10));
		} else if (currentSection === 'nearby tickets:') {
			nearbyTickets.push(line.split(',').map((v) => parseInt(v, 10)));
		}
	}
	return { fieldRanges, myTicket, nearbyTickets };
};
