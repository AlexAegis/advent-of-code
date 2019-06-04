import { runner } from '../part_two';
import { Node } from '../model/node.class';
import { expect } from 'chai';
import { year, day } from '..';
import { reader } from '@root/reader.function';

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
		resultExample = await runner(await reader(year, day, 'example.txt')());
		resultMain = await runner(await reader(year, day)());
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

	it(`Example should finish in the given ticks`, async () => {
		expect(resultExample).to.equal(15);
	});

	it(`Main should finish in given ticks`, async () => {
		expect(resultMain).to.equal(1115);
	});
});
