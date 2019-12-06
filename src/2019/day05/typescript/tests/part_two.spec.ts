import { expect } from 'chai';
import { day, results, year } from '..';
import { parseCommaSeparatedNumbers } from '../parse';
import { compute } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		// expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 1 when the input is 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,9,8,9,10,9,4,9,99,-1,8'), 8)).to.equal(1);
	});
	it('should be that that the first example resolves to 0 when the input is less than 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,9,8,9,10,9,4,9,99,-1,8'), 1)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,9,8,9,10,9,4,9,99,-1,8'), 2)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,9,8,9,10,9,4,9,99,-1,8'), 7)).to.equal(0);
	});
	it('should be that that the second example resolves to 1 when the input is less than 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,9,7,9,10,9,4,9,99,-1,8'), 1)).to.equal(1);
		expect(compute(parseCommaSeparatedNumbers('3,9,7,9,10,9,4,9,99,-1,8'), 4)).to.equal(1);
		expect(compute(parseCommaSeparatedNumbers('3,9,7,9,10,9,4,9,99,-1,8'), 7)).to.equal(1);
	});
	it('should be that that the second example resolves to 0 when the input is not less than 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,9,7,9,10,9,4,9,99,-1,8'), 8)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,9,7,9,10,9,4,9,99,-1,8'), 9)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,9,7,9,10,9,4,9,99,-1,8'), 100)).to.equal(0);
	});

	it('should be that that the third example resolves to 1 when the input is equal to 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,3,1108,-1,8,3,4,3,99'), 8)).to.equal(1);
	});
	it('should be that that the third example resolves to 0 when the input is not equal to 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,3,1108,-1,8,3,4,3,99'), 1)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,3,1108,-1,8,3,4,3,99'), 100)).to.equal(0);
	});
	it('should be that that the fourth example resolves to 1 when the input is less than 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,3,1107,-1,8,3,4,3,99'), 1)).to.equal(1);
		expect(compute(parseCommaSeparatedNumbers('3,3,1107,-1,8,3,4,3,99'), 7)).to.equal(1);
	});
	it('should be that that the fourth example resolves to 0 when the input is not less than 8', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,3,1107,-1,8,3,4,3,99'), 8)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,3,1107,-1,8,3,4,3,99'), 10)).to.equal(0);
	});

	it('should be that that the fifth and sixth example resolves to 0 when the input is 0', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'), 0)).to.equal(0);
		expect(compute(parseCommaSeparatedNumbers('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'), 0)).to.equal(0);
	});

	it('should be that that the fifth and sixth example resolves to 1 when the input is not 0', async () => {
		expect(compute(parseCommaSeparatedNumbers('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'), 20)).to.equal(1);
		expect(compute(parseCommaSeparatedNumbers('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9'), 4)).to.equal(1);
		expect(compute(parseCommaSeparatedNumbers('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'), 20)).to.equal(1);
		expect(compute(parseCommaSeparatedNumbers('3,3,1105,-1,9,1101,0,0,12,4,12,99,1'), 4)).to.equal(1);
	});

	it('should be that that the seventh example resolves to 999 when the input is less than 8', async () => {
		expect(
			compute(
				parseCommaSeparatedNumbers(
					'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
				),
				6
			)
		).to.equal(999);
		expect(
			compute(
				parseCommaSeparatedNumbers(
					'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
				),
				7
			)
		).to.equal(999);
	});

	it('should be that that the seventh example resolves to 1000 when the input is 8', async () => {
		expect(
			compute(
				parseCommaSeparatedNumbers(
					'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
				),
				8
			)
		).to.equal(1000);
	});

	it('should be that that the seventh example resolves to 1001 when the input is greater than 8', async () => {
		expect(
			compute(
				parseCommaSeparatedNumbers(
					'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
				),
				9
			)
		).to.equal(1001);

		expect(
			compute(
				parseCommaSeparatedNumbers(
					'3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99'
				),
				10
			)
		).to.equal(1001);
	});
});
