import { run } from './part_one';

describe('Day 13, Part One', () => {
	it('Should be 7,3 for the example:', async () => {
		expect(1).toEqual(1);
		expect((await run('example')).toString()).toEqual('7,3');
	});

	it('Should be  for the example:', async () => {
		expect((await run('input')).toString()).toEqual('28,107');
	});
});
