import { Direction, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const g = input.toGridGraph({});
	const possibleObstructionCoordinates = g.nodeValues
		.filter((node) => node.value === '.')
		.map((node) => node.coordinate);
	return possibleObstructionCoordinates.filter((possibleObstructionCoordinate) => {
		const g = input.toGridGraph({});

		const guardNode = g.findNode((node) => node.value === '^');
		if (!guardNode) {
			throw new Error('Guard not found');
		}

		const obsructionNode = g.getNode(possibleObstructionCoordinate);
		if (!obsructionNode) {
			throw new Error('Obstruction not found');
		}

		obsructionNode.setValue('#');
		guardNode.setValue('.');
		let guardPosition = guardNode.coordinate;
		let guardDirection = Direction.NORTH.clone();
		const guardPath = new Set<string>();
		const guardMovement = new Set<string>();

		guardPath.add(guardPosition.toString());
		guardMovement.add(guardPosition.toString() + '+' + guardDirection.toString());

		let isLoop = false;
		let i = 0;
		while (true) {
			i++;
			let forwardPosition = guardPosition.add(guardDirection);
			let forwardNode = g.getNode(forwardPosition);
			if (!forwardNode) {
				// Not a loop
				break;
			}
			if (forwardNode.value === '#') {
				guardDirection = guardDirection.rotateLeft();
			}

			const pathLengthBeforeStep = guardMovement.size;
			guardPosition.addMut(guardDirection);
			guardPath.add(guardPosition.toString());
			guardMovement.add(guardPosition.toString() + '+' + guardDirection.toString());

			const pathLengthAfterStep = guardMovement.size;
			if (pathLengthBeforeStep === pathLengthAfterStep) {
				isLoop = true;
				break;
			}
		}
		//g.print((n) => (guardPath.has(n.coordinate.toString()) ? 'X' : n.toString()));
		//console.log('--------', daysWithoutUpdate, isLoop, i);
		//	possibleObstructionNode.setValue('.');
		return isLoop;
	}).length;
};

await task(p2, packageJson.aoc); // 4602 ~0.09ms
