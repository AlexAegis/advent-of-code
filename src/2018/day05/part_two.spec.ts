import { runner } from './part_two';

describe('Day 5, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(4);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(6394);
	});
});
