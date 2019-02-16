import { runner } from './part_one';

describe('Day 12, Part One', () => {
	it('Should be 3230:', async () => {
		expect(await runner()).toEqual(3230);
	});

	it('Should be 325 when running the example:', async () => {
		expect(await runner('example')).toEqual(325);
	});
});
