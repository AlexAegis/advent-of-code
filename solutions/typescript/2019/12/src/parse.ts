import { Vec3 } from '@alexaegis/advent-of-code-lib/model';
import { NEWLINE } from '@alexaegis/advent-of-code-lib/regex';

export const parseLines = (input: string): Vec3[] => {
	return input
		.split(NEWLINE)
		.filter((line) => !!line)
		.map((line) => new Vec3(line));
};
