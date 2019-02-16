import { runner } from './part_two';

describe('Day 12, Part Two', () => {
	it('Should be 4400000000304:', async () => {
		expect(await runner()).toEqual(4400000000304);
	});

	it('Should be 999999999374 when running against the example:', async () => {
		expect(await runner('example')).toEqual(999999999374);
	});
});
