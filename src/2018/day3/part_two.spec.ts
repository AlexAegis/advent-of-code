import { read } from './part_two';

describe('Day 3, Part Two', () => {
	it('Should be:', async () => {
		expect((await read).length).toEqual(1);
		expect((await read)[0].id).toEqual(382);
	});
});
