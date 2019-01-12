import { runner } from './part_two';

describe('Day 6, Part Two', () => {
	it('should be that the example resolves to 16', async () => {
		expect(await runner('example')).toEqual(16);
	});

	it('should be that the input resolves to 42998', async () => {
		expect(await runner('input')).toEqual(42998);
	});
});
