import { task } from '@alexaegis/advent-of-code-lib';
import { findCorners } from '@alexaegis/advent-of-code-lib/functions';
import { mult } from '@alexaegis/advent-of-code-lib/math';
import { Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';
import { Tile } from './tile.class.js';

export const p1 = (input: string): number => {
	const tiles = parse(input);
	const tileMap = new Map<Vec2String, Tile>();
	Tile.alignTiles(tiles[0], Vec2.ORIGIN, tiles, tileMap);
	const corners = findCorners([...tileMap.keys()].map((k) => new Vec2(k)));

	return Object.values(corners)
		.map((c: Vec2) => tileMap.get(c.toString())?.index ?? 0)
		.reduce(mult, 1);
};

await task(p1, packageJson.aoc); // 22878471088273 ~170.90ms
