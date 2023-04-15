import { Vec2 } from '@alexaegis/advent-of-code-lib/model';

export enum Tile {
	WALL = '#',
	EMPTY = '.',
	ENTRANCE = '@',
}

export type Key = string;
export type Door = string;

export const doorMatcher = /[A-Z]/;
export const keyMatcher = /[a-z]/;

export const parseLines = (input: string): string[][] => {
	return input
		.split(/\r?\n/)
		.filter((line) => !!line)
		.map((line) => line.split(''));
};

export const parseMatrix = (
	matrix: string[][]
): {
	map: Map<string, Tile | Key | Door>;
	keys: Map<string, Vec2>;
	doors: Map<string, Vec2>;
	size: Vec2;
} => {
	const map = new Map<string, string>();
	const keys = new Map<string, Vec2>();
	const doors = new Map<string, Vec2>();
	let y = 0;
	let x = 0;
	for (y = 0; y < matrix.length; y++) {
		const row = matrix[y]!;
		for (x = 0; x < row.length; x++) {
			const tile = row[x]!;
			const vec = new Vec2(x, y);
			if (tile.match(keyMatcher)) {
				map.set(vec.toString(), Tile.EMPTY);
				keys.set(tile, vec);
			} else if (tile.match(doorMatcher)) {
				map.set(vec.toString(), Tile.EMPTY);
				doors.set(tile, vec);
			} else {
				map.set(vec.toString(), tile);
			}
		}
	}

	return { map, keys, doors, size: new Vec2(x, y) };
};
