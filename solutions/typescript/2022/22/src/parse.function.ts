import { Direction } from '@alexaegis/advent-of-code-lib';

export type MovementInstruction = 'R' | 'L' | number;

export const parseMovementInstructions = (instructions: string): MovementInstruction[] => {
	const result: MovementInstruction[] = [];
	let numberStack: string[] = [];
	for (const char of instructions) {
		if (char === 'L' || char === 'R') {
			if (numberStack.length > 0) {
				result.push(Number.parseInt(numberStack.join(''), 10));
				numberStack = [];
			}
			result.push(char);
		} else {
			numberStack.push(char);
		}
	}

	if (numberStack.length > 0) {
		result.push(Number.parseInt(numberStack.join(''), 10));
	}

	return result;
};

export const getFacingScore = (direction: Direction): number => {
	switch (direction) {
		case Direction.EAST: {
			return 0;
		}
		case Direction.SOUTH: {
			return 1;
		}
		case Direction.WEST: {
			return 2;
		}
		case Direction.NORTH: {
			return 3;
		}
		default: {
			return 0;
		}
	}
};
