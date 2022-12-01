import { groupByFalsy } from '../array/group-by-falsy.function.js';
import { split } from './split.function.js';

export const splitToIntAndGroupByWhitespace = (input: string, radix = 10): number[][] => {
	const values = split(input, true);
	const groupedValues = groupByFalsy(values);
	return groupedValues.map((group) => group.map((value) => parseInt(value, radix)));
};
