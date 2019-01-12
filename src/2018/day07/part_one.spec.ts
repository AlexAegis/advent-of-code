import { runner } from './part_one';

describe('Day 7, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).toEqual('CABDFE');
	});
	it('Should be:', async () => {
		expect(await runner()).toEqual('GRTAHKLQVYWXMUBCZPIJFEDNSO');
	});
});
