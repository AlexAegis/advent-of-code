import { runner } from './part_one';

describe('Day 4, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual(240);
	});
	it('Should be:', async () => {
		expect(await runner()).toEqual(106710);
	});
});
