import { split } from '@alexaegis/advent-of-code-lib';
import { MotionVector } from './model/motion-vector.class.js';

export const interpreter = (input: string): MotionVector[] =>
	split(input).map((line) => MotionVector.parse(line));
