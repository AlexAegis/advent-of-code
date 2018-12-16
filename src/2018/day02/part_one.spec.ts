import { read } from './part_one';

describe('Day 2, Part One', () => {
	it('Should be:', async () => {
		expect(await read).toEqual(5456);
	});
});
