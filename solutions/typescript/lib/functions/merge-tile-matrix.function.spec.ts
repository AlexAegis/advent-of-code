import { expect } from 'chai';
import { mergeTileMatrix } from './merge-tile-matrix.function';

describe('mergeTileMatrix', () => {
	const tiles = [['12\n56\n', '34\n78\n']];
	it('should be able to merge the tiles', () => {
		expect(mergeTileMatrix(tiles)).to.equal('1234\n5678\n');
	});
});
