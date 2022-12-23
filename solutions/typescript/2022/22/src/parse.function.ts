import { Direction } from '@alexaegis/advent-of-code-lib';

export type MovementInstruction = 'R' | 'L' | number;

export const parseMovementInstructions = (instructions: string): MovementInstruction[] => {
	const result: MovementInstruction[] = [];
	let numberStack: string[] = [];
	for (const char of instructions) {
		if (char === 'L' || char === 'R') {
			if (numberStack.length) {
				result.push(parseInt(numberStack.join(''), 10));
				numberStack = [];
			}
			result.push(char);
		} else {
			numberStack.push(char);
		}
	}

	if (numberStack.length) {
		result.push(parseInt(numberStack.join(''), 10));
	}

	return result;
};

export const getFacingScore = (direction: Direction): number => {
	if (direction === Direction.EAST) {
		return 0;
	} else if (direction === Direction.NORTH) {
		return 1;
	} else if (direction === Direction.WEST) {
		return 2;
	} else if (direction === Direction.SOUTH) {
		return 3;
	} else {
		return 0;
	}
};
