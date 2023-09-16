import { split } from '@alexaegis/advent-of-code-lib';
import type { Event } from './model/event.interface.js';

const interpretLine = (line: string): Event => {
	const parts = line.split(/[#:[\]-]/).map((e) => e.trim()) as [
		string,
		string,
		string,
		string,
		string,
		string,
		string,
	];

	return {
		year: Number(parts[1]),
		month: Number(parts[2]),
		day: Number(parts[3].split(/ /)[0]),
		hour: Number(parts[3].split(/ /)[1]),
		minute: Number(parts[4]),
		guard: parts[5] === 'Guard' ? Number(parts[6].split(/ /)[0]) : undefined,
		event: parts[5],
	};
};

export const interpret = (input: string): Event[] => {
	const events: Event[] = [];
	for (const line of split(input)) {
		events.push(interpretLine(line));
	}
	return events.sort((a, b) => {
		return a.year - b.year === 0
			? a.month - b.month === 0
				? a.day - b.day === 0
					? a.hour - b.hour === 0
						? a.minute - b.minute === 0
							? 0
							: a.minute - b.minute
						: a.hour - b.hour
					: a.day - b.day
				: a.month - b.month
			: a.year - b.year;
	});
};
