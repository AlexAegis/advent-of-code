import { runner } from './part_two';

describe('Day 2, Part Two', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual('abcde');
	});

	it('Should be:', async () => {
		expect(await runner()).toEqual('megsdlpulxvinkatfoyzxcbvq');
	});
});
