import { bench, read } from '@lib';
import { mergeTileMatrix } from '@lib/functions';
import { createTileMatrixFromMap } from '@lib/functions/create-tile-matrix-from-map.function';
import { Vec2, Vec2String } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse.function';
import { Tile } from './tile.class';

export const runner = (input: string): number => {
	const tiles = parse(input);
	const tileMap = new Map<Vec2String, Tile>();
	Tile.alignTiles(tiles[0], Vec2.ORIGIN, tiles, tileMap);

	const mergedMap = mergeTileMatrix(createTileMatrixFromMap(tileMap, (t) => t.toString(false)));

	const monster = [
		// 3.50
		'                  # ',
		'#    ##    ##    ###',
		' #  #  #  #  #  #   ',
	]
		.join('\n')
		.vectorsOf('#', true);

	// const allTiles = new Set<string>();
	const monsterTiles = new Set<string>();
	let foundThem = false; // The monsters only appear in one orientation
	for (const sea of mergedMap.toMatrix().flipFlop()) {
		// allTiles.clear();
		monsterTiles.clear();
		for (let y = 0; y < sea.length; y++) {
			const row = sea[y];
			for (let x = 0; x < row.length; x++) {
				// if (row[x] === '#') {
				// 	allTiles.add(new Vec2(x, y).toString());
				// }
				const relativeMonsterTiles = monster.map((d) => d.clone().addMut({ x, y }));
				if (relativeMonsterTiles.every((d) => sea[d.x]?.[d.y] === '#')) {
					relativeMonsterTiles.forEach((d) => monsterTiles.add(d.toString()));
					foundThem = true;
				}
			}
		}
		if (foundThem) {
			break;
		}
	}

	// return [...allTiles.values()].count((at) => !monsterTiles.has(at));
	return (mergedMap.match(/#/g)?.length ?? 0) - monsterTiles.size;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1680 ~197.06ms
}
