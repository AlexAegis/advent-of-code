import { Orbit } from './model/orbit.class';

export const parse = (input: string): Orbit[] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line => {
			const s = line.split(')');
			return new Orbit(s[0], s[1]);
		});
};
