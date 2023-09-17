import { describe, expect, it } from 'vitest';
import { vectorsInStringTile } from './vectors-in-string-tile.function.js';

describe('vectorsInStringTile', () => {
	const tile = '.#\n#.';
	it('should be able find all the # chatacters positions', () => {
		const positions = vectorsInStringTile(tile, '#');
		expect(JSON.stringify(positions)).toEqual('[{"x":1,"y":0},{"x":0,"y":1}]');
		expect(positions.length).toEqual(2);
	});

	it('should be able find all the # chatacters positions indexed from the bottom', () => {
		const positions = vectorsInStringTile(tile, '#', true);
		expect(JSON.stringify(positions)).toEqual('[{"x":1,"y":1},{"x":0,"y":0}]');
		expect(positions.length).toEqual(2);
	});
});
