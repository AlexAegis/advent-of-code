import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';

import packageJson from '../package.json' assert { type: 'json' };
import {
	getOutcome,
	Shape,
	shapeKeyMap,
	Strategy,
	StrategyResponse,
} from './rock-paper-scissors.type.js';

const simpleShapeStrategyMap: Record<StrategyResponse, Shape> = {
	X: Shape.ROCK,
	Y: Shape.PAPER,
	Z: Shape.SCISSORS,
};

export const p1 = (input: string): number =>
	split(input)
		.map((line) => line.split(' ') as Strategy)
		.map(([opponent, strategy]) => [shapeKeyMap[opponent], simpleShapeStrategyMap[strategy]])
		.map(([opponentShape, myShape]) => myShape + getOutcome(opponentShape, myShape))
		.sum();

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 11063 ~0.78ms
}
