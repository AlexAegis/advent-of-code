import type { ToString } from '../model/to-string.interface.js';
import { Vec2 } from '../model/vector/vec2.class.js';
import type { Vec2String } from '../model/vector/vec2.class.types.js';
import { NEWLINE } from '../regex/index.js';
import { findCorners } from './find-corners.function.js';
import { generateStringTile } from './generate-string-tile.function.js';

/**
 *
 * @param tileMap it's keys have to be vectors or parseable to vectors
 * @param tileToString
 * @param emptyTileBase
 */
export const createTileMatrixFromMap = <T>(
	tileMap: Map<Vec2String, T>,
	tileToString: (t: T) => string = (t) => (t as Partial<ToString>).toString?.() ?? '_',
	emptyTileBase = '_',
): string[][] => {
	const result: string[][] = [];
	const corners = findCorners([...tileMap.keys()].map((c) => new Vec2(c)));
	const emptyTiles: Vec2[] = [];
	let tileWidth = 0;
	let tileHeight = 0;
	for (let y = 0; y <= corners.topRight.y - corners.bottomLeft.y; y++) {
		for (let x = 0; x <= corners.topRight.x - corners.bottomLeft.x; x++) {
			const originalVector = new Vec2(x + corners.bottomLeft.x, y + corners.bottomLeft.y);
			const tile = tileMap.get(originalVector.toString());
			if (tile) {
				let row = result[y];
				if (!row) {
					row = [];
					result[y] = row;
				}
				const s = tileToString(tile);
				row[x] = s;
				if (tileHeight === 0) {
					const tileRows = s.split(NEWLINE);
					tileHeight = tileRows.length - 1;
					tileWidth = tileRows[0]?.length ?? 0;
				}
			} else {
				emptyTiles.push(new Vec2(x, y));
			}
		}
	}
	for (const emptyTile of emptyTiles) {
		const row = result[emptyTile.y];
		if (row) {
			row[emptyTile.x] = generateStringTile(tileWidth, tileHeight, emptyTileBase);
		}
	}
	return result.reverse();
};
