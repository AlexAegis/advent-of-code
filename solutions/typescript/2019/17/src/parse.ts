import {
	Direction,
	DirectionArrowSymbol,
	Vec2,
	type Vec2String,
} from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';

export const parse = (input: string): number[] => {
	return input
		.split(',')
		.filter((c) => /^([+-])?\d+/.test(c))
		.map((c) => Number.parseInt(c, 10));
};

export enum Tile {
	SCAFFOLD = '#',
	OPEN = '.',
}

export interface Vacuum {
	pos: Vec2;
	dir: Direction;
}

export const computeMap = (input: string): [Map<Vec2String, Tile>, Vacuum] => {
	const i = new IntCodeComputer(parse(input));
	const it = i.iter();
	const map = new Map<Vec2String, Tile>();
	const cursor = new Vec2(0, 0);
	let vacuum!: Vacuum;
	while (!i.isHalt()) {
		const res = it.next().value as number | undefined;
		const resc: DirectionArrowSymbol | Tile | '\n' = String.fromCodePoint(res ?? 0) as
			| DirectionArrowSymbol
			| Tile
			| '\n';

		switch (resc) {
			case Tile.OPEN: {
				map.set(cursor.toString(), Tile.OPEN);
				break;
			}
			case Tile.SCAFFOLD: {
				map.set(cursor.toString(), Tile.SCAFFOLD);
				break;
			}
			case DirectionArrowSymbol.NORTH:
			case DirectionArrowSymbol.EAST:
			case DirectionArrowSymbol.SOUTH:
			case DirectionArrowSymbol.WEST: {
				map.set(cursor.toString(), Tile.SCAFFOLD);
				vacuum = {
					pos: cursor.clone(),
					dir: Direction.fromMarker(resc as DirectionArrowSymbol).reverse(),
				};
				break;
			}
			case '\n': {
				cursor.x = -1;
				cursor.y--;
				break;
			}
		}
		cursor.x++;
	}
	return [map, vacuum];
};
