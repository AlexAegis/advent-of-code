import { runner } from '../part_one';
import { expect } from 'chai';
import { year, day } from '..';
import { reader } from '@root/reader.function';

describe(`${year} - Day ${day} - Part One`, () => {
	it('Should be:', async () => {
		expect(await runner(await reader(year, day, 'example.txt')())).to.equal('CABDFE');
	});
	it('Should be:', async () => {
		expect(await runner(await reader(year, day)())).to.equal('GRTAHKLQVYWXMUBCZPIJFEDNSO');
	});
});
