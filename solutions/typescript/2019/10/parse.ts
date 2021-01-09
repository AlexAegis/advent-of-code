import { Vec2 } from '@lib/model';

export enum FieldType {
	EMPTY = '.',
	ASTEROID = '#',
}

export const parseLines = (input: string): Map<string, Vec2> => {
	const matrix = input
		.split(/\r?\n/)
		.filter((line) => !!line)
		.map((line) =>
			line
				.split('')
				.filter((c) => /^(\.|#)$/.test(c))
				.map((a) => a as FieldType)
		);

	const map = new Map();
	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i];
		for (let j = 0; j < row.length; j++) {
			const coord = new Vec2(j, i);
			if (row[j] === FieldType.ASTEROID) {
				map.set(coord.toString(), coord);
			}
		}
	}
	return map;
};
