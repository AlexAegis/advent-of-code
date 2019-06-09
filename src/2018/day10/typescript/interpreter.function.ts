import { Vector } from './model/vector.class';
import { split } from '@root';

export const interpreter = (input: string): Array<Vector> => split(input).map(line => Vector.parse(line));
