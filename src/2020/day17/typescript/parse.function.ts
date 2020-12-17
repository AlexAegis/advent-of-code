import { split } from '@lib';

export const parse = (input: string, dimensionCount = 3): Set<string> => {
	const lines = split(input);
	const cubes = new Set<string>();
	let y = 0;
	for (const line of lines) {
		let x = 0;
		for (const letter of line) {
			if (letter === '#')
				cubes.add(`${x},${y}` + ',0'.repeat(Math.max(dimensionCount - 2, 0)));
			x++;
		}
		y++;
	}
	return cubes;
};
