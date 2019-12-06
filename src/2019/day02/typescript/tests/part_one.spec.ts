import { read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { expect } from 'chai';
import { day, results, year } from '..';
import { parse } from '../parse';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 3500', async () => {
		const computer = new IntCodeComputer(parse('1,9,10,3,2,3,11,0,99,30,40,50'), true);
		computer.execute();
		expect(computer.peek(0)).to.equal(3500);
	});

	it('should be that that the second example resolves to 2', async () => {
		const computer = new IntCodeComputer(parse('1,0,0,0,99'), true);
		computer.execute();
		expect(computer.peek(0)).to.equal(2);
	});

	it('should be that that the third example resolves to 2', async () => {
		const computer = new IntCodeComputer(parse('2,3,0,3,99'), true);
		computer.execute();
		expect(computer.peek(0)).to.equal(2);
	});

	it('should be that that the fourth example resolves to 2', async () => {
		const computer = new IntCodeComputer(parse('2,4,4,5,99,0'), true);
		computer.execute();
		expect(computer.peek(0)).to.equal(2);
	});

	it('should be that that the fifth example resolves to 30', async () => {
		const computer = new IntCodeComputer(parse('1,1,1,4,99,5,6,0,99'), true);
		computer.execute();
		expect(computer.peek(0)).to.equal(30);
	});
});
