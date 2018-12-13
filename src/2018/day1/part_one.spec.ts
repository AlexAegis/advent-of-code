import { runner } from './part_one';

describe('Day 1, Part One', () => {
	it('Should be:', async done => {
		expect(await runner).toEqual(408);
		done();
	}, 10000);
});
