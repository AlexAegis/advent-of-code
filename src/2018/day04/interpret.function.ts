import { Event } from './event.interface';

export const interpret = (line: string): Event => {
	let parts = line.split(/\[|-|:|]|#/).map(e => e.trim());
	return {
		year: Number(parts[1]),
		month: Number(parts[2]),
		day: Number(parts[3].split(/ /)[0]),
		hour: Number(parts[3].split(/ /)[1]),
		minute: Number(parts[4]),
		guard: parts[5] === 'Guard' ? Number(parts[6].split(/ /)[0]) : undefined,
		event: parts[5]
	};
};
