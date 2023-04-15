import { task } from '@alexaegis/advent-of-code-lib';
import {
	createTileMatrixFromMap,
	mergeTileMatrix,
	renderMatrix,
} from '@alexaegis/advent-of-code-lib/functions';
import { Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';
import { parse } from './parse.function.js';
import { Tile } from './tile.class.js';

export const p2 = (input: string): number => {
	const tiles = parse(input);
	console.log('tiles', tiles);
	const tileMap = new Map<Vec2String, Tile>();
	Tile.alignTiles(tiles[0], Vec2.ORIGIN, tiles, tileMap);

	const mergedMap = mergeTileMatrix(createTileMatrixFromMap(tileMap, (t) => t.toString(false)));
	console.log('mergedMap', mergedMap);
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
		console.log('sea\n', renderMatrix(sea));
		// allTiles.clear();
		monsterTiles.clear();
		for (let y = 0; y < sea.length; y++) {
			const row = sea[y]!;
			for (let x = 0; x < row.length; x++) {
				const pos = new Vec2(x, -y);
				// if (row[x] === '#') {
				// 	allTiles.add(new Vec2(x, y).toString());
				// }
				const relativeMonsterTiles = monster.map((d) => pos.add(d));
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

await task(p2, packageJson.aoc, 'example.1.txt'); // 1680 ~197.06ms
