import { Graph, Node } from './part_two';

describe('Day 7 Part Two', () => {
	const node_a: Node = new Node('a');
	const node_A: Node = new Node('A');
	const node_b: Node = new Node('b');
	const node_z: Node = new Node('z');

	const a_cost_non_base = 1;
	const a_cost_base = 61;
	const b_cost_non_base = 2;
	const b_cost_base = 62;
	const z_cost_base = 86;

	it('Node cost is equal regardless of casing', () => {
		expect(node_a.cost()).toEqual(node_A.cost());
	});

	it(`Node cost of 'a' is ${a_cost_base}`, () => {
		expect(node_a.cost()).toEqual(a_cost_base);
	});

	it(`Node cost of non base 'a' is ${a_cost_non_base}`, () => {
		expect(node_a.cost(false)).toEqual(a_cost_non_base);
	});

	it(`Node cost of 'b' is ${b_cost_base}`, () => {
		expect(node_b.cost()).toEqual(b_cost_base);
	});

	it(`Node cost of non base 'b' is ${b_cost_non_base}`, () => {
		expect(node_b.cost(false)).toEqual(b_cost_non_base);
	});

	it(`Node cost of 'z' is ${z_cost_base}`, () => {
		expect(node_z.cost()).toEqual(z_cost_base);
	});

	it('should return a message', () => {
		expect('Hello, testing!').toEqual('Hello, testing!');
	});
});
