import { Vec2 } from '@lib/model';

export enum Tile {
	WALL = '#',
	EMPTY = '.',
	ENTRANCE = '@'
}

export const parseLines = (
	input: string
): { map: Map<string, string>; keys: Map<string, Vec2>; doors: Map<string, Vec2>; size: Vec2 } => {
	const map = new Map<string, string>();
	const keys = new Map<string, Vec2>();
	const doors = new Map<string, Vec2>();
	const matrix = input
		.split(/\r?\n/)
		.filter(line => !!line)
		.map(line => line.split(''));
	let y = 0;
	let x = 0;
	for (y = 0; y < matrix.length; y++) {
		const row = matrix[y];
		for (x = 0; x < row.length; x++) {
			const tile = row[x];
			const vec = new Vec2(x, y);
			map.set(vec.toString(), tile);
			if (tile.match(/[a-z]/)) {
				keys.set(tile, vec);
			} else if (tile.match(/[A-Z]/)) {
				doors.set(tile, vec);
			}
		}
	}

	return { map, keys, doors, size: new Vec2(x, y) };
};
