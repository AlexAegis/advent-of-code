import { runner } from './part_two';

describe('Day 13, Part Two', () => {
	it('Should be 6,4 for the example:', async () => {
		expect(1).toEqual(1);
		expect((await runner('example_two')).toString()).toEqual('6,4');
	});

	it('Should be 36,123 for the input:', async () => {
		expect((await runner('input')).toString()).toEqual('36,123');
	}, 30000); // this is long!
});
