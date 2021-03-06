import { expect } from 'chai';
import { vectorsInStringTile } from './vectors-in-string-tile.function';

describe('vectorsInStringTile', () => {
	const tile = '.#\n#.';
	it('should be able find all the # chatacters positions', () => {
		const positions = vectorsInStringTile(tile, '#');
		expect(JSON.stringify(positions)).to.equal('[{"x":1,"y":0},{"x":0,"y":1}]');
		expect(positions.length).to.equal(2);
	});

	it('should be able find all the # chatacters positions indexed from the bottom', () => {
		const positions = vectorsInStringTile(tile, '#', true);
		expect(JSON.stringify(positions)).to.equal('[{"x":1,"y":1},{"x":0,"y":0}]');
		expect(positions.length).to.equal(2);
	});
});
