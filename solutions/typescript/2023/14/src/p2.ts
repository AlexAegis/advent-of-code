/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Direction, GridGraphNode, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const tilt = <T extends string = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	allNodes: N[],
	direction: Direction,
) => {
	for (;;) {
		const movable = allNodes.find(
			(n) => n.value === 'O' && n.neighbours.get(direction)?.to.value === '.',
		);
		if (movable === undefined) {
			break;
		}

		movable.setValue('.' as T);
		movable.neighbours.get(direction)?.to.setValue('O' as T);
	}
};

const cycle = <T extends string = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	allNodes: N[],
) => {
	for (const cardinalDirection of Direction.cardinalDirections) {
		tilt<T>(allNodes, cardinalDirection);
	}
};

export const findCycle = <T>(values: T[]): T[] | undefined => {
	let cycle: T[] | undefined;
	for (let cs = 1; cs < values.length / 2; cs++) {
		const possibleCycle = values.slice(values.length - cs);

		if (possibleCycle.every((v, i) => values[values.length - i - cs * 2] === v)) {
			cycle = possibleCycle;
		}
	}

	return cycle;
};

export const p2 = (input: string): number => {
	const gg = input.toGridGraph();

	const allNodes = gg.nodes.valueArray();

	gg.print();
	console.log('----------------');
	const cc = 10;
	// const hashes = [gg.toString()];

	for (let i = 0; i < cc; i++) {
		// console.log('----------------');
		cycle(allNodes);
		//	hashes.push(gg.toString());
		// const possibleCycle = findCycle(hashes);
		// if (possibleCycle) {
		// 	console.log('CYCLE FOUND!', possibleCycle.length);
		// 	break;
		// }
		//gg.print();

		if (i % 10_000 === 0) {
			console.log((i / cc) * 100);
		}
	}
	gg.print();
	const aabb = gg.boundingBox();
	return allNodes
		.filter((n) => n.value === 'O')
		.map((n) => aabb.height - n.coordinate.y)
		.sum();
};

await task(p2, packageJson.aoc); // 109661 ~0ms
