import { ClockwiseDirection } from './clockwise-direction.enum';
import { directionMarkerAssociations } from './direction-marker-associations.const';
import {
	DirectionGeographicLetter,
	DirectionLiteralLetter,
	DirectionMarker,
	DirectionSymbol,
} from './direction-marker.type';
import { Vec2 } from './vec2.class';

export class Direction extends Vec2 {
	private constructor(public marker: DirectionMarker) {
		super(directionMarkerAssociations[marker]);
	}

	public get value(): ClockwiseDirection {
		switch (this.marker) {
			case DirectionSymbol.NORTH:
			case DirectionLiteralLetter.NORTH:
			case DirectionGeographicLetter.NORTH:
				return ClockwiseDirection.NORTH;
			case DirectionSymbol.EAST:
			case DirectionLiteralLetter.EAST:
			case DirectionGeographicLetter.EAST:
				return ClockwiseDirection.EAST;
			case DirectionSymbol.SOUTH:
			case DirectionLiteralLetter.SOUTH:
			case DirectionGeographicLetter.SOUTH:
				return ClockwiseDirection.SOUTH;
			case DirectionSymbol.WEST:
			case DirectionLiteralLetter.WEST:
			case DirectionGeographicLetter.WEST:
				return ClockwiseDirection.WEST;
		}
	}

	public get reverseValue(): ClockwiseDirection {
		return Direction.reverseValue(this.value);
	}
	public static readonly NORTH = new Direction(DirectionSymbol.NORTH);
	public static readonly EAST = new Direction(DirectionSymbol.EAST);
	public static readonly SOUTH = new Direction(DirectionSymbol.SOUTH);
	public static readonly WEST = new Direction(DirectionSymbol.WEST);

	public static directions: Direction[] = [
		Direction.NORTH,
		Direction.EAST,
		Direction.SOUTH,
		Direction.WEST,
	];

	public static isHorizonal(marker: DirectionMarker): boolean {
		return (
			marker === DirectionSymbol.EAST ||
			marker === DirectionSymbol.WEST ||
			marker === DirectionLiteralLetter.EAST ||
			marker === DirectionLiteralLetter.WEST ||
			marker === DirectionGeographicLetter.EAST ||
			marker === DirectionGeographicLetter.WEST
		);
	}

	public static isVertical(marker: DirectionMarker): boolean {
		return (
			marker === DirectionSymbol.NORTH ||
			marker === DirectionSymbol.SOUTH ||
			marker === DirectionLiteralLetter.NORTH ||
			marker === DirectionLiteralLetter.SOUTH ||
			marker === DirectionGeographicLetter.NORTH ||
			marker === DirectionGeographicLetter.SOUTH
		);
	}

	public static isDirectionMarker(marker: string): marker is DirectionMarker {
		return (
			marker === DirectionSymbol.NORTH ||
			marker === DirectionSymbol.EAST ||
			marker === DirectionSymbol.SOUTH ||
			marker === DirectionSymbol.WEST ||
			marker === DirectionLiteralLetter.NORTH ||
			marker === DirectionLiteralLetter.EAST ||
			marker === DirectionLiteralLetter.SOUTH ||
			marker === DirectionLiteralLetter.WEST ||
			marker === DirectionGeographicLetter.NORTH ||
			marker === DirectionGeographicLetter.EAST ||
			marker === DirectionGeographicLetter.SOUTH ||
			marker === DirectionGeographicLetter.WEST
		);
	}

	public static from(marker: DirectionMarker): Direction {
		switch (marker) {
			case DirectionSymbol.NORTH:
			case DirectionLiteralLetter.NORTH:
			case DirectionGeographicLetter.NORTH:
				return Direction.NORTH;
			case DirectionSymbol.EAST:
			case DirectionLiteralLetter.EAST:
			case DirectionGeographicLetter.EAST:
				return Direction.EAST;
			case DirectionSymbol.SOUTH:
			case DirectionLiteralLetter.SOUTH:
			case DirectionGeographicLetter.SOUTH:
				return Direction.SOUTH;
			case DirectionSymbol.WEST:
			case DirectionLiteralLetter.WEST:
			case DirectionGeographicLetter.WEST:
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
