import { split, task } from '@alexaegis/advent-of-code-lib';

import packageJson from '../package.json' assert { type: 'json' };
import {
	Outcome,
	Shape,
	losingResponseMap,
	shapeKeyMap,
	winningResponseMap,
	type Strategy,
	type StrategyResponse,
} from './rock-paper-scissors.type.js';

const shapeStrategyMap: Record<StrategyResponse, Outcome> = {
	X: Outcome.LOSE,
	Y: Outcome.DRAW,
	Z: Outcome.WIN,
};

const shapeForOutcome = (opponentChoice: Shape, outcome: Outcome): Shape => {
	if (outcome === Outcome.WIN) {
		return winningResponseMap[opponentChoice];
	} else if (outcome === Outcome.LOSE) {
		return losingResponseMap[opponentChoice];
	} else {
		return opponentChoice;
	}
};

export const p2 = (input: string): number =>
	split(input)
		.map((line) => line.split(' ') as Strategy)
		.map(([opponent, strategy]) => [shapeKeyMap[opponent], shapeStrategyMap[strategy]] as const)
		.map(([opponentShape, outcome]) => outcome + shapeForOutcome(opponentShape, outcome))
		.sum();

await task(p2, packageJson.aoc); // 10349 ~0.74ms
