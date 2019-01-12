import { runner } from './part_one';

describe('Day 13, Part One', () => {
	it('Should be 7,3 for the example:', async () => {
		expect(1).toEqual(1);
		expect((await runner('example')).toString()).toEqual('7,3');
	});

	it('Should be 7,3 for the example:', async () => {
		expect(1).toEqual(1);
		expect((await runner('example_two')).toString()).toEqual('2,0');
	});

	it('Should be 28,107 for the input:', async () => {
		expect((await runner('input')).toString()).toEqual('28,107');
	});
});
