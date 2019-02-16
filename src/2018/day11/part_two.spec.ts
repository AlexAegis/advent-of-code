import { runner } from './part_two';

describe('Day 11, Part Two', () => {
	it('Should be at 21,37 with a size of X value of 30:', async () => {
		expect(await runner()).toEqual('21,37,X (30)');
	});
});
