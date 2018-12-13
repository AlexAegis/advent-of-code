import { read } from './part_two';

describe('Day 1, Part Two', () => {
	it('Should be:', async () => {
		expect(await read).toEqual(55250);
	});
});
