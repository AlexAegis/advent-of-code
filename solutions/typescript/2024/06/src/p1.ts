import { Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const g = input.toGridGraph({});
	const guardNode = g.findNode((node) => node.value === '^');
	if (!guardNode) {
		throw new Error('Guard not found');
	}
	guardNode.setValue('.');
	let guardPosition = guardNode.coordinate;
	let guardDirection = Direction.NORTH.clone();
	console.log(guardPosition);
	const guardPath = new Set<string>();
	guardPath.add(guardPosition.toString());

	while (true) {
		let forwardPosition = guardPosition.add(guardDirection);
		let forwardNode = g.getNode(forwardPosition);
		if (!forwardNode) {
			break;
		}
		if (forwardNode.value === '#') {
			guardDirection = guardDirection.rotateLeft();
		}

		guardPosition.addMut(guardDirection);
		guardPath.add(guardPosition.toString());
	}
	//g.print((n) => (guardPath.has(n.coordinate.toString()) ? 'X' : n.toString()));
	return guardPath.size;
};

await task(p1, packageJson.aoc); // 4602 ~0.09ms
