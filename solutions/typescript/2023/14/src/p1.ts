/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

export const p1 = (input: string): number => {
	const gg = input.toGridGraph();

	const allNodes = gg.nodes.valueArray();
	for (;;) {
		const movable = allNodes.find((n) => n.value === 'O' && n.north?.to.value === '.');
		if (movable === undefined) {
			break;
		}

		movable.setValue('.');
		movable.north?.to.setValue('O');
	}

	const aabb = gg.boundingBox();

	return allNodes
		.filter((n) => n.value === 'O')
		.map((n) => aabb.height - n.coordinate.y)
		.sum();
};

await task(p1, packageJson.aoc); // 109661 ~0ms
