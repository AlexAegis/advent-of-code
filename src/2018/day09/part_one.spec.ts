import { runner } from './part_one';

describe('Day 9, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(138);
	});
	it('Should be:', async () => {
		expect(await runner()).toEqual(47112);
	});
});
