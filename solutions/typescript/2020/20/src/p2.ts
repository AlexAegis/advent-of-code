import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { createTileMatrixFromMap, mergeTileMatrix } from '@alexaegis/advent-of-code-lib/functions';
import { Vec2, Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';
import { Tile } from './tile.class.js';

export const p2 = (input: string): number => {
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

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 1680 ~197.06ms
}
