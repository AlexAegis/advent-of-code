import { read } from './part_one';

describe('Day 3, Part One', () => {
	it('Should be:', async () => {
		expect(await read).toEqual(116920);
	});
});
