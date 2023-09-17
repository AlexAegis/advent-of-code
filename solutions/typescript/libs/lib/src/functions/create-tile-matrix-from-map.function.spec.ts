import { describe, expect, it } from 'vitest';
import { Vec2, type Vec2String } from '../model/index.js';
import { createTileMatrixFromMap } from './create-tile-matrix-from-map.function.js';
import { mergeTileMatrix } from './merge-tile-matrix.function.js';

describe('createTileMatrixFromMap', () => {
	const tileMap = new Map<Vec2String, string>();
	tileMap.set(new Vec2(-1, -1).toString(), '##\n##\n');
	tileMap.set(new Vec2(0, 0).toString(), '##\n##\n');
	it('should be able to generate a tilematrix', () => {
		const tileMatrix = createTileMatrixFromMap(tileMap);
		expect(mergeTileMatrix(tileMatrix)).toEqual('__##\n__##\n##__\n##__\n');
	});
});
