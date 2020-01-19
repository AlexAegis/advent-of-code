import { ClockwiseDirection } from './clockwise-direction.enum';
import { directionMarkerAssociations } from './direction-marker-associations.const';
import { DirectionMarker } from './direction-marker.type';
import { Vec2 } from './vec2.class';

console.log(Vec2);

export class Direction extends Vec2 {
	private constructor(public marker: DirectionMarker) {
		super(directionMarkerAssociations[marker]);
	}

	public get value(): ClockwiseDirection {
		switch (this.marker) {
			case DirectionMarker.NORTH:
				return ClockwiseDirection.NORTH;
			case DirectionMarker.EAST:
				return ClockwiseDirection.EAST;
			case DirectionMarker.SOUTH:
				return ClockwiseDirection.SOUTH;
			case DirectionMarker.WEST:
				return ClockwiseDirection.WEST;
		}
	}

	public get reverseValue(): ClockwiseDirection {
		return Direction.reverseValue(this.value);
	}
	public static readonly NORTH = new Direction(DirectionMarker.NORTH);
	public static readonly EAST = new Direction(DirectionMarker.EAST);
	public static readonly SOUTH = new Direction(DirectionMarker.SOUTH);
	public static readonly WEST = new Direction(DirectionMarker.WEST);

	public static directions: Direction[] = [Direction.NORTH, Direction.EAST, Direction.SOUTH, Direction.WEST];

	public static isHorizonal(marker: DirectionMarker): boolean {
		return marker === DirectionMarker.EAST || marker === DirectionMarker.WEST;
	}

	public static isVertical(marker: DirectionMarker): boolean {
		return marker === DirectionMarker.NORTH || marker === DirectionMarker.SOUTH;
	}

	public static from(marker: DirectionMarker) {
		switch (marker) {
			case DirectionMarker.NORTH:
				return Direction.NORTH;
			case DirectionMarker.EAST:
				return Direction.EAST;
			case DirectionMarker.SOUTH:
				return Direction.SOUTH;
			case DirectionMarker.WEST:
				return Direction.WEST;
		}
	}

	public static reverseValue(v: ClockwiseDirection): ClockwiseDirection {
		switch (v) {
			case ClockwiseDirection.NORTH:
				return ClockwiseDirection.SOUTH;
			case ClockwiseDirection.EAST:
				return ClockwiseDirection.WEST;
			case ClockwiseDirection.SOUTH:
				return ClockwiseDirection.NORTH;
			case ClockwiseDirection.WEST:
				return ClockwiseDirection.EAST;
		}
	}

	public isHorizonal(): boolean {
		return Direction.isHorizonal(this.marker);
	}
	public isVertical(): boolean {
		return Direction.isVertical(this.marker);
	}

	public right(): Direction {
		if (this.equals(Direction.NORTH)) return Direction.EAST;
		else if (this.equals(Direction.EAST)) return Direction.SOUTH;
		else if (this.equals(Direction.SOUTH)) return Direction.WEST;
		else return Direction.NORTH;
	}

	public left(): Direction {
		if (this.equals(Direction.NORTH)) return Direction.WEST;
		else if (this.equals(Direction.WEST)) return Direction.SOUTH;
		else if (this.equals(Direction.SOUTH)) return Direction.EAST;
		else return Direction.NORTH;
	}

	public reverse(axis?: 'h' | 'v'): Direction {
		if ((!axis || axis === 'v') && this.equals(Direction.NORTH)) return Direction.SOUTH;
		else if ((!axis || axis === 'h') && this.equals(Direction.WEST)) return Direction.EAST;
		else if ((!axis || axis === 'v') && this.equals(Direction.SOUTH)) return Direction.NORTH;
		else if ((!axis || axis === 'h') && this.equals(Direction.EAST)) return Direction.WEST;
		else return this;
	}

	public equals(that: Direction): boolean {
		return that && this.x === that.x && this.y === that.y;
	}

	public clone(): Direction {
		return new Direction(this.marker);
	}
}
