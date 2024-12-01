import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse, stepUntil } from './parse.js';

export const p1 = (input: string): number => {
	const [graph, instructions] = parse(input);
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const startingNode = graph.nodes.get('AAA')!;
	return stepUntil(startingNode, instructions, (node) => node.key === 'ZZZ');
};

await task(p1, packageJson.aoc); // 22199 ~10.25ms
