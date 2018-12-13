import { read } from './part_one';

describe('Day 1, Part One', () => {
	it('Should be:', async () => {
		expect(await read).toEqual(408);
	});
});
