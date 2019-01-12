import { Claim } from './claim.interface';

export const interpret = (line: string): Claim => {
	let parts = line.split(/#|@|,|:|x/).map(e => e.trim());
	return {
		id: Number(parts[1]),
		starting: { x: Number(parts[2]), y: Number(parts[3]) },
		size: { x: Number(parts[4]), y: Number(parts[5]) }
	};
};
