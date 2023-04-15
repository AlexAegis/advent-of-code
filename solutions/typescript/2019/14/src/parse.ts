import { Reaction } from './reaction.class.js';

export const parse = (input: string): Reaction[] => {
	return input
		.split(/\r?\n/)
		.filter((line) => !!line)
		.map((line) => {
			const [from, to] = line.splitIntoStringPair(' => ');
			return new Reaction(from, to);
		});
};
