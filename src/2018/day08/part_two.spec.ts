import { runner } from './part_two';

describe('Day 8, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(66);
	});
	it('Should be:', async () => {
		expect(await runner()).toEqual(28237);
	});
});
