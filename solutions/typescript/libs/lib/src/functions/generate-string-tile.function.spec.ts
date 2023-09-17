import { describe, expect, it } from 'vitest';
import { generateStringTile } from './generate-string-tile.function.js';

describe('generateStringTile', () => {
	it('should be able to generate a tile', () => {
		expect(generateStringTile(3, 2, '#')).toEqual('###\n###\n');
	});
});
