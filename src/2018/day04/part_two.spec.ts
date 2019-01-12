import { runner } from './part_two';

describe('Day 4, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(4455);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(10491);
	});
});
