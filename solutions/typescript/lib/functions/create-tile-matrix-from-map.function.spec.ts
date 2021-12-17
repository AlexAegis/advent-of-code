import { Vec2, Vec2String } from '@lib/model';
import { expect } from 'chai';
import { createTileMatrixFromMap } from './create-tile-matrix-from-map.function';
import { mergeTileMatrix } from './merge-tile-matrix.function';

describe('createTileMatrixFromMap', () => {
	const tileMap = new Map<Vec2String, string>();
	tileMap.set(new Vec2(-1, -1).toString(), '##\n##\n');
	tileMap.set(new Vec2(0, 0).toString(), '##\n##\n');
	it('should be able to generate a tilematrix', () => {
		const tileMatrix = createTileMatrixFromMap(tileMap);
		expect(mergeTileMatrix(tileMatrix)).to.equal('__##\n__##\n##__\n##__\n');
	});
});
