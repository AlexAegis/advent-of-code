import { split } from '@alexaegis/advent-of-code-lib';
import { Vec2 } from '@alexaegis/advent-of-code-lib/model';

export enum TileColor {
	BLACK = 1,
	WHITE = 0,
}

export type HexagonalDirection = 'e' | 'se' | 'sw' | 'w' | 'nw' | 'ne';

export const hexagonalAxialDirections: Record<HexagonalDirection, Vec2> = {
	e: new Vec2(1, 0),
	w: new Vec2(-1, 0),
	ne: new Vec2(1, -1),
	sw: new Vec2(-1, 1),
	se: new Vec2(0, 1),
	nw: new Vec2(0, -1),
};

export const invertedHexagonalDirections: Record<HexagonalDirection, HexagonalDirection> = {
	e: 'w',
	w: 'e',
	sw: 'ne',
	ne: 'sw',
	se: 'nw',
	nw: 'se',
};

export const parse = (input: string): HexagonalDirection[][] => {
	const instructions: HexagonalDirection[][] = [];
	for (const line of split(input)) {
		const neighbours: HexagonalDirection[] = [];
		let chomp = line;
		while (chomp.length) {
			if (chomp.startsWith('se')) {
				neighbours.push('se');
				chomp = chomp.slice(2);
			} else if (chomp.startsWith('sw')) {
				neighbours.push('sw');
				chomp = chomp.slice(2);
			} else if (chomp.startsWith('nw')) {
				neighbours.push('nw');
				chomp = chomp.slice(2);
			} else if (chomp.startsWith('ne')) {
				neighbours.push('ne');
				chomp = chomp.slice(2);
			} else if (chomp.startsWith('w')) {
				neighbours.push('w');
				chomp = chomp.slice(1);
			} else if (chomp.startsWith('e')) {
				neighbours.push('e');
				chomp = chomp.slice(1);
			}
		}
		instructions.push(neighbours);
	}
	return instructions;
};
