import { split } from '@lib';
import { Vector } from './model/vector.class';

export const interpreter = (input: string): Vector[] =>
	split(input).map((line) => Vector.parse(line));
