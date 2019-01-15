import { runner } from './part_one';

describe('Day 10, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(0);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(0);
	});
});
