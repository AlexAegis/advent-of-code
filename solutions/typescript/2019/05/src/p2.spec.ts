import { read } from '@alexaegis/advent-of-code-lib';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';
import { parse } from './parse.js';

describe('2019 - Day 5 - Part Two', () => {
	const seventhInput = parse(
		'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
	);

	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(6959377);
	});

	it('should be that that the first example resolves to 1 when the input is 8', async () => {
		expect(
			new IntCodeComputer(parse('3,9,8,9,10,9,4,9,99,-1,8')).withInput(8).execute().pop()
		).to.equal(1);
	});
	it('should be that that the first example resolves to 0 when the input is less than 8', async () => {
		expect(
			new IntCodeComputer(parse('3,9,8,9,10,9,4,9,99,-1,8')).withInput(1).execute().pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,9,8,9,10,9,4,9,99,-1,8')).withInput(2).execute().pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,9,8,9,10,9,4,9,99,-1,8')).withInput(7).execute().pop()
		).to.equal(0);
	});

	it('should be that that the second example resolves to 1 when the input is less than 8', async () => {
		expect(
			new IntCodeComputer(parse('3,9,7,9,10,9,4,9,99,-1,8')).withInput(1).execute().pop()
		).to.equal(1);

		expect(
			new IntCodeComputer(parse('3,9,7,9,10,9,4,9,99,-1,8')).withInput(4).execute().pop()
		).to.equal(1);

		expect(
			new IntCodeComputer(parse('3,9,7,9,10,9,4,9,99,-1,8')).withInput(7).execute().pop()
		).to.equal(1);
	});
	it('should be that that the second example resolves to 0 when the input is not less than 8', async () => {
		expect(
			new IntCodeComputer(parse('3,9,7,9,10,9,4,9,99,-1,8')).withInput(8).execute().pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,9,7,9,10,9,4,9,99,-1,8')).withInput(9).execute().pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,9,7,9,10,9,4,9,99,-1,8')).withInput(100).execute().pop()
		).to.equal(0);
	});

	it('should be that that the third example resolves to 1 when the input is equal to 8', async () => {
		expect(
			new IntCodeComputer(parse('3,3,1108,-1,8,3,4,3,99')).withInput(8).execute().pop()
		).to.equal(1);
	});
	it('should be that that the third example resolves to 0 when the input is not equal to 8', async () => {
		expect(
			new IntCodeComputer(parse('3,3,1108,-1,8,3,4,3,99')).withInput(1).execute().pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,3,1108,-1,8,3,4,3,99')).withInput(100).execute().pop()
		).to.equal(0);
	});
	it('should be that that the fourth example resolves to 1 when the input is less than 8', async () => {
		expect(
			new IntCodeComputer(parse('3,3,1107,-1,8,3,4,3,99')).withInput(1).execute().pop()
		).to.equal(1);

		expect(
			new IntCodeComputer(parse('3,3,1107,-1,8,3,4,3,99')).withInput(7).execute().pop()
		).to.equal(1);
	});
	it('should be that that the fourth example resolves to 0 when the input is not less than 8', async () => {
		expect(
			new IntCodeComputer(parse('3,3,1107,-1,8,3,4,3,99')).withInput(8).execute().pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,3,1107,-1,8,3,4,3,99')).withInput(10).execute().pop()
		).to.equal(0);
	});

	it('should be that that the fifth and sixth example resolves to 0 when the input is 0', async () => {
		expect(
			new IntCodeComputer(parse('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'))
				.withInput(0)
				.execute()
				.pop()
		).to.equal(0);

		expect(
			new IntCodeComputer(parse('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'))
				.withInput(0)
				.execute()
				.pop()
		).to.equal(0);
	});

	it('should be that that the fifth and sixth example resolves to 1 when the input is not 0', async () => {
		expect(
			new IntCodeComputer(parse('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'))
				.withInput(20)
				.execute()
				.pop()
		).to.equal(1);

		expect(
			new IntCodeComputer(parse('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'))
				.withInput(4)
				.execute()
				.pop()
		).to.equal(1);

		expect(
			new IntCodeComputer(parse('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'))
				.withInput(20)
				.execute()
				.pop()
		).to.equal(1);

		expect(
			new IntCodeComputer(parse('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'))
				.withInput(4)
				.execute()
				.pop()
		).to.equal(1);
	});

	it('should be that that the seventh example resolves to 999 when the input is less than 8', async () => {
		expect(new IntCodeComputer(seventhInput).withInput(6).execute().pop()).to.equal(999);

		expect(new IntCodeComputer(seventhInput).withInput(5).execute().pop()).to.equal(999);
	});

	it('should be that that the seventh example resolves to 1000 when the input is 8', async () => {
		expect(new IntCodeComputer(seventhInput).withInput(8).execute().pop()).to.equal(1000);
	});

	it('should be that that the seventh example resolves to 1001 when the input is greater than 8', async () => {
		expect(new IntCodeComputer(seventhInput).withInput(9).execute().pop()).to.equal(1001);

		expect(new IntCodeComputer(seventhInput).withInput(10).execute().pop()).to.equal(1001);
	});
});
