import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import type { Args } from './model/args.interface.js';
import { Node } from './model/node.class.js';
import { p2 } from './p2.js';

describe('2018 - Day 7 - Part Two', () => {
	const NODE_A: Node = new Node('a');
	const NODE_UA: Node = new Node('A');
	const NODE_B: Node = new Node('b');
	const NODE_Z: Node = new Node('z');

	it('Node cost is equal regardless of casing', () => {
		expect(NODE_A.cost()).to.equal(NODE_UA.cost());
	});

	it('Node cost of a is 61', () => {
		expect(NODE_A.cost(true)).to.equal(61);
	});

	it('Node cost of non base a is 1', () => {
		expect(NODE_A.cost()).to.equal(1);
	});

	it('Node cost of b is 62', () => {
		expect(NODE_B.cost(true)).to.equal(62);
	});

	it('Node cost of non base b is 2', () => {
		expect(NODE_B.cost()).to.equal(2);
	});

	it('Node cost of z is 86', () => {
		expect(NODE_Z.cost(true)).to.equal(86);
	});

	it('should solve the input', async () => {
		const { input, args } = await loadTaskResources<Args>(packageJson.aoc);
		expect(p2(input, args)).to.equal(1115);
	});

	it('should solve the example', async () => {
		const { input, args } = await loadTaskResources<Args>(packageJson.aoc, 'example.txt');
		expect(p2(input, args)).to.equal(15);
	});
});
