import { type } from 'arktype';

export const splitIntoStringPair = (s: string, delimiter?: string | RegExp): [string, string] => {
	return type(['string', 'string']).assert(s.split(delimiter ?? ' '));
};
