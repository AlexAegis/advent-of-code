import { Coord } from './coord.class';
import { directionMarkerAssociations } from './direction-marker-associations.const';
import { DirectionMarker } from './direction-marker.type';

export class Direction extends Coord {
	public constructor(public marker: DirectionMarker) {
		super(directionMarkerAssociations[marker]);
	}
	public static NORTH = new Direction('^');
	public static SOUTH = new Direction('v');
	public static EAST = new Direction('>');
	public static WEST = new Direction('<');

	public static directions: string[] = ['^', 'v', '>', '<'];

	public static isHorizonal(marker: DirectionMarker): boolean {
		return marker === '>' || marker === '<';
	}

	public static isVertical(marker: DirectionMarker): boolean {
		return marker === '^' || marker === 'v';
	}

	public right(): Direction {
		if (this.equals(Direction.NORTH)) return Direction.EAST;
		else if (this.equals(Direction.EAST)) return Direction.SOUTH;
		else if (this.equals(Direction.SOUTH)) return Direction.WEST;
		else if (this.equals(Direction.WEST)) return Direction.NORTH;
		else return Direction.NORTH;
	}

	public left(): Direction {
		if (this.equals(Direction.NORTH)) return Direction.WEST;
		else if (this.equals(Direction.WEST)) return Direction.SOUTH;
		else if (this.equals(Direction.SOUTH)) return Direction.EAST;
		else if (this.equals(Direction.EAST)) return Direction.NORTH;
		else return Direction.NORTH;
	}

	public equals(that: Direction): boolean {
		return that && this.x === that.x && this.y === that.y;
	}

	public clone(): Direction {
		return new Direction(this.marker);
	}
}
