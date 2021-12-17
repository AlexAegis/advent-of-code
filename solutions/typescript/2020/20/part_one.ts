import { bench, read } from '@lib';
import { findCorners } from '@lib/functions';
import { mult } from '@lib/math';
import { Vec2, Vec2String } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse.function';
import { Tile } from './tile.class';

export const runner = (input: string): number => {
	const tiles = parse(input);
	const tileMap = new Map<Vec2String, Tile>();
	Tile.alignTiles(tiles[0], Vec2.ORIGIN, tiles, tileMap);
	const corners = findCorners([...tileMap.keys()].map((k) => new Vec2(k)));

	return Object.values(corners)
		.map((c: Vec2) => tileMap.get(c.toString())?.index ?? 0)
		.reduce(mult, 1);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 22878471088273 ~170.90ms
}
