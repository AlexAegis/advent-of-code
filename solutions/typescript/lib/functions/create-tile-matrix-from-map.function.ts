import { Vec2, Vec2String } from '@lib/model';
import { ToString } from '@lib/model/to-string.interface';
import { NEWLINE } from '@lib/regex';
import { findCorners } from './find-corners.function';
import { generateStringTile } from './generate-string-tile.function';

/**
 *
 * @param tileMap it's keys have to be vectors or parseable to vectors
 * @param tileToString
 * @param emptyTileBase
 */
export const createTileMatrixFromMap = <T>(
	tileMap: Map<Vec2String, T>,
	tileToString: (t: T) => string = (t) => (t as ToString).toString?.() ?? '_',
	emptyTileBase = '_'
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
				if (tileHeight === 0 && tileHeight === 0) {
					const tileRows = s.split(NEWLINE);
					tileHeight = tileRows.length - 1;
					tileWidth = tileRows[0].length;
				}
			} else {
				emptyTiles.push(new Vec2(x, y));
			}
		}
	}
	for (const emptyTile of emptyTiles) {
		result[emptyTile.y][emptyTile.x] = generateStringTile(tileWidth, tileHeight, emptyTileBase);
	}
	return result.reverse();
};
