import { Coord } from '@lib/model';

export enum FieldType {
	EMPTY = '.',
	ASTEROID = '#'
}

export class Field {
	public lineOfSight = 0;
	public constructor(public type: FieldType, public pos: Coord) {}
}

export const parseLines = (input: string): FieldType[][] => {
	return input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line =>
			line
				.split('')
				.filter(c => /^(\.|#)$/.test(c))
				.map(a => a as FieldType)
		);
};

export const intoMap = (matrix: FieldType[][]): Map<string, Field> => {
	const map = new Map();
	for (let i = 0; i < matrix.length; i++) {
		const row = matrix[i];
		for (let j = 0; j < row.length; j++) {
			const coord = new Coord(j, i);
			if (row[j] === FieldType.ASTEROID) {
				map.set(coord.toString(), new Field(row[j], coord));
			}
		}
	}
	return map;
};
