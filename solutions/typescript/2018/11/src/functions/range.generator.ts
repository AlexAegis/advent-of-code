import { Vec2 } from '@alexaegis/advent-of-code-lib/model';

export interface Range {
	from: number;
	to: number;
}

export function* range(xRange: Range, yRange: Range): Generator<Vec2> {
	for (let x = xRange.from; x <= xRange.to; x++) {
		for (let y = yRange.from; y <= yRange.to; y++) {
			yield new Vec2(x, y);
		}
	}
}
