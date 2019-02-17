import { runner } from './part_one';
import { expect } from 'chai';

describe('Day 7, Part One', () => {
	it('Should be:', async () => {
		expect(await runner('example')).to.equal('CABDFE');
	});
	it('Should be:', async () => {
		expect(await runner()).to.equal('GRTAHKLQVYWXMUBCZPIJFEDNSO');
	});
});
