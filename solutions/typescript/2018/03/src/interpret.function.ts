import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { type } from 'arktype';
import type { Claim } from './model/claim.interface.js';

export const interpret = (line: string): Claim => {
	const strings = type(['string', 'string', 'string', 'string', 'string', 'string']);
	const parts = strings.assert(line.split(/[#,:@x]/).map((e) => e.trim()));

	return {
		id: Number.parseInt(parts[1], 10),
		starting: new Vec2(Number.parseInt(parts[2], 10), Number.parseInt(parts[3], 10)),
		size: new Vec2(Number.parseInt(parts[4], 10), Number.parseInt(parts[5], 10)),
	};
};
