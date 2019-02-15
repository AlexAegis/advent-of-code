import { runner } from './part_one';

describe('Day 11, Part One', () => {
	it('Should be at 21,37 with a value of 30:', async () => {
		expect(await runner()).toEqual('21,37 (30)');
	});
});
