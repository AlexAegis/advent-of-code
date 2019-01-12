import { runner } from './part_one';

describe('Day 3, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(4);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(116920);
	});
});
