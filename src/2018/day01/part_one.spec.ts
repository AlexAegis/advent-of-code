import { runner } from './part_one';

describe('Day 1, Part One', () => {
	it('Should be that that the input resolves to 408', async () => {
		expect(await runner()).toEqual(408);
	});

	it('Should be that that the example resolves to 4', async () => {
		expect(await runner('example')).toEqual(4);
	});
});
