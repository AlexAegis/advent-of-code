import { runner } from './part_one';

describe('Day 9, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example_0')).toEqual(32);
	});

	it('Should be:', async () => {
		expect(await runner('example_1')).toEqual(8317);
	});

	it('Should be:', async () => {
		expect(await runner('example_2')).toEqual(146373);
	});

	it('Should be:', async () => {
		expect(await runner('example_3')).toEqual(2764);
	});

	it('Should be:', async () => {
		expect(await runner('example_4')).toEqual(54718);
	});

	it('Should be:', async () => {
		expect(await runner('example_5')).toEqual(37305);
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual(361466);
	});
});
