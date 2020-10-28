import { Vec3 } from '@lib/model/vec3.class';
import { NEWLINE } from '@lib/regex';

export const parseLines = (input: string): Vec3[] => {
	return input
		.split(NEWLINE)
		.filter((line) => !!line)
		.map((line) => new Vec3(line));
};
