import {
	CardinalDirectionValueClockwise,
	DirectionArrowSymbol,
	DirectionCardinalGeographicLetter,
	DirectionCardinalLiteralLetter,
	DirectionMarker,
} from './direction-marker.type';
import { Vec2, Vec2Like } from './vec2.class';

export class Direction extends Vec2 {
	private constructor(marker: DirectionMarker);
	private constructor(vec2: Vec2Like | string);
	private constructor(x: number, y: number);
	private constructor(x: number | string | Vec2Like | DirectionMarker, y?: number);
	private constructor(x: number | string | Vec2Like | DirectionMarker, y?: number) {
		super(x, y);
	}

	public get cardinalValue(): CardinalDirectionValueClockwise | undefined {
		if (this.equals(Direction.NORTH)) {
			return CardinalDirectionValueClockwise.NORTH;
		} else if (this.equals(Direction.EAST)) {
			return CardinalDirectionValueClockwise.EAST;
		} else if (this.equals(Direction.SOUTH)) {
			return CardinalDirectionValueClockwise.SOUTH;
		} else if (this.equals(Direction.WEST)) {
			return CardinalDirectionValueClockwise.WEST;
		} else {
			return undefined;
		}
	}

	public get reverseValue(): CardinalDirectionValueClockwise | undefined {
		return Direction.reverseValue(this.cardinalValue);
	}

	public static readonly NOOP = Object.freeze(new Direction(0, 0));
	public static readonly EAST = Object.freeze(new Direction(1, 0));
	public static readonly NORTHEAST = Object.freeze(new Direction(1, 1));
	public static readonly NORTH = Object.freeze(new Direction(0, 1));
	public static readonly NORTHWEST = Object.freeze(new Direction(-1, 1));
	public static readonly WEST = Object.freeze(new Direction(-1, 0));
	public static readonly SOUTHWEST = Object.freeze(new Direction(-1, -1));
	public static readonly SOUTH = Object.freeze(new Direction(0, -1));
	public static readonly SOUTHEAST = Object.freeze(new Direction(1, -1));

	/**
	 * Main directions
	 *
	 * Counter-Clockwise from east
	 */
	public static readonly cardinalDirections: Direction[] = [
		Direction.EAST,
		Direction.NORTH,
		Direction.WEST,
		Direction.SOUTH,
	];

	/**
	 * Diagonal directions
	 *
	 * Clockwise from north
	 */
	public static readonly ordinalDirections: Direction[] = [
		Direction.NORTHEAST,
		Direction.SOUTHEAST,
		Direction.SOUTHWEST,
		Direction.NORTHWEST,
	];

	/**
	 * All 8 directions, cardinal and ordinal combined
	 *
	 * Counter-Clockwise from east
	 */
	public static readonly directions: Direction[] = [
		Direction.EAST,
		Direction.NORTHEAST,
		Direction.NORTH,
		Direction.NORTHWEST,
		Direction.WEST,
		Direction.SOUTHWEST,
		Direction.SOUTH,
		Direction.SOUTHEAST,
	];

	public static isHorizonal(marker: DirectionMarker): boolean {
		return (
			marker === DirectionArrowSymbol.EAST ||
			marker === DirectionArrowSymbol.WEST ||
			marker === DirectionCardinalLiteralLetter.EAST ||
			marker === DirectionCardinalLiteralLetter.WEST ||
			marker === DirectionCardinalGeographicLetter.EAST ||
			marker === DirectionCardinalGeographicLetter.WEST
		);
	}

	public static isVertical(marker: DirectionMarker): boolean {
		return (
			marker === DirectionArrowSymbol.NORTH ||
			marker === DirectionArrowSymbol.SOUTH ||
			marker === DirectionCardinalLiteralLetter.NORTH ||
			marker === DirectionCardinalLiteralLetter.SOUTH ||
			marker === DirectionCardinalGeographicLetter.NORTH ||
			marker === DirectionCardinalGeographicLetter.SOUTH
		);
	}

	public static fromMarker(marker: DirectionMarker): Direction {
		return directionMarkerAssociationMap[marker];
	}

	public static reverseValue(
		v?: CardinalDirectionValueClockwise
	): CardinalDirectionValueClockwise | undefined {
		switch (v) {
			case CardinalDirectionValueClockwise.NORTH:
				return CardinalDirectionValueClockwise.SOUTH;
			case CardinalDirectionValueClockwise.EAST:
				return CardinalDirectionValueClockwise.WEST;
			case CardinalDirectionValueClockwise.SOUTH:
				return CardinalDirectionValueClockwise.NORTH;
			case CardinalDirectionValueClockwise.WEST:
				return CardinalDirectionValueClockwise.EAST;
			default:
				return undefined;
		}
	}

	public isHorizonal(): boolean {
		return this.equals(Direction.WEST) || this.equals(Direction.EAST);
	}

	public isVertical(): boolean {
		return this.equals(Direction.NORTH) || this.equals(Direction.SOUTH);
	}

	/**
	 * @param angle must be a multiple of 45, turns clockwise
	 */
	public turn(angle: number): Direction {
		if (angle % 45 !== 0) {
			throw new Error(`Angle must be a multiple of 45, it was ${angle} instead`);
		}
		const step = (this.angularValue + (angle % 360)) / 45;
		return Direction.directions[
			(step + Direction.directions.length) % Direction.directions.length
		];
	}

	/**
	 * Returns angles from [0, 1] (east)
	 *
	 * Counter-Clockwise
	 */
	public get angularValue(): number {
		if (this.equals(Direction.EAST)) return 0;
		else if (this.equals(Direction.NORTHEAST)) return 45;
		else if (this.equals(Direction.NORTH)) return 90;
		else if (this.equals(Direction.NORTHWEST)) return 135;
		else if (this.equals(Direction.WEST)) return 180;
		else if (this.equals(Direction.SOUTHWEST)) return 225;
		else if (this.equals(Direction.SOUTH)) return 270;
		else if (this.equals(Direction.SOUTHEAST)) return 315;
		else return 0;
	}

	/**
	 * @param angle must be a multiple of 45
	 */
	public right(angle = 90): Direction {
		return this.turn(-angle);
	}

	/**
	 * @param angle must be a multiple of 45
	 */
	public left(angle = 90): Direction {
		return this.turn(angle);
	}

	public reverse(axis?: 'h' | 'v'): Direction {
		if ((!axis || axis === 'v') && this.equals(Direction.NORTH)) return Direction.SOUTH;
		else if ((!axis || axis === 'h') && this.equals(Direction.WEST)) return Direction.EAST;
		else if ((!axis || axis === 'v') && this.equals(Direction.SOUTH)) return Direction.NORTH;
		else if ((!axis || axis === 'h') && this.equals(Direction.EAST)) return Direction.WEST;
		else return this;
	}

	public equals(that: Direction): boolean {
		return this.x === that.x && this.y === that.y;
	}

	public clone(): Direction {
		return new Direction(this);
	}

	public get marker(): DirectionArrowSymbol | ' ' {
		if (this.equals(Direction.EAST)) return DirectionArrowSymbol.EAST;
		else if (this.equals(Direction.NORTH)) return DirectionArrowSymbol.NORTH;
		else if (this.equals(Direction.WEST)) return DirectionArrowSymbol.WEST;
		else if (this.equals(Direction.SOUTH)) return DirectionArrowSymbol.SOUTH;
		else return ' ';
	}
}

export const directionMarkerAssociationMap = {
	[DirectionArrowSymbol.NORTH]: Direction.NORTH,
	[DirectionCardinalGeographicLetter.NORTH]: Direction.NORTH,
	[DirectionCardinalLiteralLetter.NORTH]: Direction.NORTH,
	[DirectionArrowSymbol.EAST]: Direction.EAST,
	[DirectionCardinalGeographicLetter.EAST]: Direction.EAST,
	[DirectionCardinalLiteralLetter.EAST]: Direction.EAST,
	[DirectionArrowSymbol.SOUTH]: Direction.SOUTH,
	[DirectionCardinalGeographicLetter.SOUTH]: Direction.SOUTH,
	[DirectionCardinalLiteralLetter.SOUTH]: Direction.SOUTH,
	[DirectionArrowSymbol.WEST]: Direction.WEST,
	[DirectionCardinalGeographicLetter.WEST]: Direction.WEST,
	[DirectionCardinalLiteralLetter.WEST]: Direction.WEST,
	'': Direction.NOOP,
};

export const directionMarkerInvertMap = {
	[DirectionArrowSymbol.NORTH]: DirectionArrowSymbol.SOUTH,
	[DirectionCardinalGeographicLetter.NORTH]: DirectionCardinalGeographicLetter.SOUTH,
	[DirectionCardinalLiteralLetter.NORTH]: DirectionCardinalLiteralLetter.SOUTH,
	[DirectionArrowSymbol.EAST]: DirectionArrowSymbol.WEST,
	[DirectionCardinalGeographicLetter.EAST]: DirectionCardinalGeographicLetter.WEST,
	[DirectionCardinalLiteralLetter.EAST]: DirectionCardinalLiteralLetter.WEST,
	[DirectionArrowSymbol.SOUTH]: DirectionArrowSymbol.NORTH,
	[DirectionCardinalGeographicLetter.SOUTH]: DirectionCardinalGeographicLetter.NORTH,
	[DirectionCardinalLiteralLetter.SOUTH]: DirectionCardinalLiteralLetter.NORTH,
	[DirectionArrowSymbol.WEST]: DirectionArrowSymbol.EAST,
	[DirectionCardinalGeographicLetter.WEST]: DirectionCardinalGeographicLetter.EAST,
	[DirectionCardinalLiteralLetter.WEST]: DirectionCardinalLiteralLetter.EAST,
	'': '',
};
