import { Reaction } from './reaction.class';

export const parse = (input: string): Reaction[] => {
	return input
		.split(/\r?\n/)
		.filter((line) => !!line)
		.map((line) => {
			const [from, to] = line.split(' => ');
			return new Reaction(from, to);
		});
};
