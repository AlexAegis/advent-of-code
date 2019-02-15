import { Coord } from './coord.class';

export type Range = { from: number; to: number };

export function* range(xRange: Range, yRange: Range) {
	for (let x = xRange.from; x <= xRange.to; x++) {
		for (let y = yRange.from; y <= yRange.to; y++) {
			yield new Coord(x, y);
		}
	}
}
