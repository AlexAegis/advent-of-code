import { read } from '@root';
import { expect } from 'chai';
import { Args, day, results, year } from '..';
import { Node } from '../model/node.class';
import { runner } from '../part_two';

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
		const { input, args } = await read<Args>(year, day)();
		expect(await runner(input, args)).to.equal(results.two.input);
	});

	it(`should resolve to ${results.two.example} when using the example`, async () => {
		const { input, args } = await read<Args>(year, day, 'example.txt')();
		expect(await runner(input, args)).to.equal(results.two.example);
	});
});
