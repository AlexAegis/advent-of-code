import { runner } from './part_one';

describe('Day 5, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(10);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(9202);
	});
});
