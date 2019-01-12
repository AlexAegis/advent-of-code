import { runner } from './part_two';

describe('Day 3, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(3);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(382);
	});
});
