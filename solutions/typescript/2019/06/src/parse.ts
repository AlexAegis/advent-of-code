import type { SizedTuple } from '@alexaegis/advent-of-code-lib';
import { Orbit } from './model/orbit.class.js';

export const parse = (input: string): Orbit[] => {
	return input
		.split(/\r?\n/)
		.filter((line) => !!line)
		.map((line) => {
			const s = line.split(')') as SizedTuple<string, 2>;
			return new Orbit(s[0], s[1]);
		});
};
