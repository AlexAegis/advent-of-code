import { describe, expect, it } from 'vitest';
import { mergeTileMatrix } from './merge-tile-matrix.function.js';

describe('mergeTileMatrix', () => {
	const tiles = [['12\n56\n', '34\n78\n']];
	it('should be able to merge the tiles', () => {
		expect(mergeTileMatrix(tiles)).toEqual('1234\n5678\n');
	});
});
