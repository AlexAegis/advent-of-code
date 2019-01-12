import { runner } from './part_one';

describe('Day 2, Part One', () => {
	it('Should be that the example resolves to 12:', async () => {
		expect(await runner('example')).toEqual(12);
	});
	it('Should be that the input resolves to 5456:', async () => {
		expect(await runner()).toEqual(5456);
	});
});
