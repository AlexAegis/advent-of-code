import { split } from '@alexaegis/advent-of-code-lib';
import { Vector } from './model/vector.class.js';

export const interpreter = (input: string): Vector[] =>
	split(input).map((line) => Vector.parse(line));
