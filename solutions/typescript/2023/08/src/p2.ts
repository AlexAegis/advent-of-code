import { lcm, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse, stepUntil } from './parse.js';

export const p2 = (input: string): number => {
	const [graph, instructions] = parse(input);
	const startingNodes = graph.nodeValues.filter((node) => node.key.endsWith('A'));
	return lcm(
		startingNodes.map((startingNode) =>
			stepUntil(startingNode, instructions, (node) => node.key.endsWith('Z')),
		),
	);
};

await task(p2, packageJson.aoc); // 13334102464297 ~11.44ms
