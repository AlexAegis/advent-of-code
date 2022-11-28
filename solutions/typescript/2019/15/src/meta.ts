import { drawMapStatic, printMatrix } from '@alexaegis/advent-of-code-lib/functions';
import { Direction } from '@alexaegis/advent-of-code-lib/model';

export enum Move {
	NORTH = 1,
	SOUTH = 2,
	WEST = 3,
	EAST = 4,
}

export const getDirection = (move: Move): Direction => {
	switch (move) {
		case Move.NORTH:
			return Direction.NORTH;
		case Move.SOUTH:
			return Direction.SOUTH;
		case Move.EAST:
			return Direction.EAST;
		case Move.WEST:
			return Direction.WEST;
	}
};

export const getMove = (direction: Direction): Move => {
	if (direction.equals(Direction.NORTH)) {
		return Move.NORTH;
	} else if (direction.equals(Direction.EAST)) {
		return Move.EAST;
	} else if (direction.equals(Direction.SOUTH)) {
		return Move.SOUTH;
	} else if (direction.equals(Direction.WEST)) {
		return Move.WEST;
	} else {
		throw new Error('Not a direction: ' + direction.toString());
	}
};

export enum Status {
	WALL = 0,
	MOVED = 1,
	FINISHED = 2,
}

export enum Tile {
	WALL = '#',
	EMPTY = '.',
	OXY = 'O',
	DROID = 'D',
	UNKNOWN = '_',
}

export const statusToTile = (s: Status): Tile => {
	switch (s) {
		case Status.FINISHED:
			return Tile.OXY;
		case Status.MOVED:
			return Tile.EMPTY;
		case Status.WALL:
			return Tile.WALL;
	}
};

const W = 20;
const H = 20;

export const draw = (m: Map<string, string>): void => {
	console.log(
		printMatrix(
			drawMapStatic(
				m,
				(t) => {
					switch (t) {
						case Tile.EMPTY:
							return '  ';
						case Tile.OXY:
							return 'X!';
						case Tile.DROID:
							return 'O/';
						case Tile.WALL:
							return '██';
						default:
							return '░░';
					}
				},
				-1,
				W,
				-1,
				H,
				true
			),
			true,
			false
		)
	);
};
