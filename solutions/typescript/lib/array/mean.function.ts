import { sum } from '@lib/math';

export const mean = (array: number[]): number =>
	array.length > 0 ? array.reduce(sum, 0) / array.length : 0;
