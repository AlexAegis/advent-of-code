import { runner } from '../part_two';
import { Node } from '../model/node.class';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results, Args } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	const node_a: Node = new Node('a');
	const node_A: Node = new Node('A');
	const node_b: Node = new Node('b');
	const node_z: Node = new Node('z');

	const a_cost_short = 1;
	const a_cost_long = 61;
	const b_cost_short = 2;
	const b_cost_long = 62;
	const z_cost_long = 86;

	let resultExample: number;
	let resultMain: number;
	before(async function() {
		this.timeout(5000);
		const inputExample = await reader<Args>(year, day, 'example.txt')();
		const inputMain = await reader<Args>(year, day)();

		resultExample = await runner(inputExample.input, inputExample.args);
		resultMain = await runner(inputMain.input, inputMain.args);
	});
	it('Node cost is equal regardless of casing', () => {
		expect(node_a.cost()).to.equal(node_A.cost());
	});

	it(`Node cost of 'a' is ${a_cost_long}`, () => {
		expect(node_a.cost(true)).to.equal(a_cost_long);
	});

	it(`Node cost of non base 'a' is ${a_cost_short}`, () => {
		expect(node_a.cost()).to.equal(a_cost_short);
	});

	it(`Node cost of 'b' is ${b_cost_long}`, () => {
		expect(node_b.cost(true)).to.equal(b_cost_long);
	});

	it(`Node cost of non base 'b' is ${b_cost_short}`, () => {
		expect(node_b.cost()).to.equal(b_cost_short);
	});

	it(`Node cost of 'z' is ${z_cost_long}`, () => {
		expect(node_z.cost(true)).to.equal(z_cost_long);
	});

	it(`should resolve to ${results.two.input} when using the input`, async () => {
		const { input, args } = await reader<Args>(year, day)();
		expect(await runner(input, args)).to.equal(results.two.input);
	});

	it(`should resolve to ${results.two.example} when using the example`, async () => {
		const { input, args } = await reader<Args>(year, day, 'example.txt')();
		expect(await runner(input, args)).to.equal(results.two.example);
	});
});
