import { Vec2 } from '../vector/vec2.class.js';
import type { Vec2Like, Vec2String } from '../vector/vec2.class.types.js';
import { DirectionArrowSymbol, DirectionNames } from './direction-arrow-symbol.enum.js';
import { DirectionCardinalGeographicLetter } from './direction-cardinal-geographic-letter.enum.js';
import { DirectionCardinalLiteralLetter } from './direction-cardinal-literal-letter.enum.js';
import { DirectionCardinalNumericClockwiseIndex } from './direction-cardinal-numeric-clockwise-index.enum.js';
import type { DirectionMarker } from './direction-marker.type.js';

export type DirectionNoopLetter = ' ';

// TODO: make use of something like this, change NORTH and SOUTH according to this
export type GlobalCoordinateSystem = 'Y-UP' | 'Y-DOWN';
export class Direction extends Vec2 {
	static SYSTEM: GlobalCoordinateSystem = 'Y-DOWN';

	private constructor(marker: DirectionMarker | Vec2Like | Vec2String);
	private constructor(x: number, y: number);
	private constructor(x: number | Vec2String | Vec2Like | DirectionMarker, y?: number);
	private constructor(x: number | Vec2String | Vec2Like | DirectionMarker, y?: number) {
		super(x, y);
	}

	/**
	 * Returns the cardinal index of this direction clockwise
	 * NORTH: 0
	 * EAST: 1
	 * SOUTH: 2
	 * WEST: 3
	 */
	public get cardinalValue(): DirectionCardinalNumericClockwiseIndex | undefined {
		if (this.equals(Direction.NORTH)) {
			return DirectionCardinalNumericClockwiseIndex.NORTH;
		} else if (this.equals(Direction.EAST)) {
			return DirectionCardinalNumericClockwiseIndex.EAST;
		} else if (this.equals(Direction.SOUTH)) {
			return DirectionCardinalNumericClockwiseIndex.SOUTH;
		} else if (this.equals(Direction.WEST)) {
			return DirectionCardinalNumericClockwiseIndex.WEST;
		} else {
			return undefined;
		}
	}

	public get reverseValue(): DirectionCardinalNumericClockwiseIndex | undefined {
		return Direction.reverseValue(this.cardinalValue);
	}

	public static readonly ZERO = Object.freeze(new Direction(0, 0));
	public static readonly EAST = Object.freeze(new Direction(1, 0));
	public static readonly NORTHEAST = Object.freeze(new Direction(1, -1));
	public static readonly NORTH = Object.freeze(new Direction(0, -1));
	public static readonly NORTHWEST = Object.freeze(new Direction(-1, -1));
	public static readonly WEST = Object.freeze(new Direction(-1, 0));
	public static readonly SOUTHWEST = Object.freeze(new Direction(-1, 1));
	public static readonly SOUTH = Object.freeze(new Direction(0, 1));
	public static readonly SOUTHEAST = Object.freeze(new Direction(1, 1));

	/**
	 * Main directions
	 * N, W, S, E
	 *
	 * Counter-Clockwise from east
	 */
	public static readonly cardinalDirections = Object.freeze([
		Direction.NORTH,
		Direction.WEST,
		Direction.SOUTH,
		Direction.EAST,
	]);

	/**
	 * Diagonal directions (Intercardinal)
	 * NE, SE, SW, NW
	 *
	 * Clockwise from north
	 */
	public static readonly ordinalDirections = Object.freeze([
		Direction.NORTHEAST,
		Direction.SOUTHEAST,
		Direction.SOUTHWEST,
		Direction.NORTHWEST,
	]);

	/**
	 * All 8 directions, cardinal and ordinal combined
	 * E, NE, N, NW, W, SW, S, SE
	 *
	 * Counter-Clockwise from east
	 */
	public static readonly allDirections = Object.freeze([
		Direction.EAST,
		Direction.NORTHEAST,
		Direction.NORTH,
		Direction.NORTHWEST,
		Direction.WEST,
		Direction.SOUTHWEST,
		Direction.SOUTH,
		Direction.SOUTHEAST,
	]);

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

	public sameAxis(other: Direction): boolean {
		return this.isHorizonal() ? other.isHorizonal() : other.isVertical();
	}

	public static fromMarker(marker: DirectionMarker): Direction {
		return directionMarkerAssociationMap[marker];
	}

	public static reverseValue(
		v?: DirectionCardinalNumericClockwiseIndex,
	): DirectionCardinalNumericClockwiseIndex | undefined {
		switch (v) {
			case DirectionCardinalNumericClockwiseIndex.NORTH: {
				return DirectionCardinalNumericClockwiseIndex.SOUTH;
			}
			case DirectionCardinalNumericClockwiseIndex.EAST: {
				return DirectionCardinalNumericClockwiseIndex.WEST;
			}
			case DirectionCardinalNumericClockwiseIndex.SOUTH: {
				return DirectionCardinalNumericClockwiseIndex.NORTH;
			}
			case DirectionCardinalNumericClockwiseIndex.WEST: {
				return DirectionCardinalNumericClockwiseIndex.EAST;
			}
			default: {
				return undefined;
			}
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
		const step = (this.angularValue + (angle % 360)) / 45;
		const direction =
			Direction.allDirections[
				(step + Direction.allDirections.length) % Direction.allDirections.length
			];

		if (direction) {
			return direction;
		} else {
			throw new Error(`Not a valid angle: ${angle}, it must be a multiple of 45!`);
		}
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

	public reverse(axis?: 'h' | 'v'): this {
		if ((!axis || axis === 'v') && this.equals(Direction.NORTH)) return Direction.SOUTH as this;
		else if ((!axis || axis === 'h') && this.equals(Direction.WEST))
			return Direction.EAST as this;
		else if ((!axis || axis === 'v') && this.equals(Direction.SOUTH))
			return Direction.NORTH as this;
		else if ((!axis || axis === 'h') && this.equals(Direction.EAST))
			return Direction.WEST as this;
		else return this;
	}

	public override equals(that: Direction): boolean {
		return this.x === that.x && this.y === that.y;
	}

	public override clone(): Direction {
		return new Direction(this);
	}

	public get marker(): DirectionArrowSymbol | ' ' {
		if (this.equals(Direction.EAST)) return DirectionArrowSymbol.EAST;
		else if (this.equals(Direction.NORTH)) return DirectionArrowSymbol.NORTH;
		else if (this.equals(Direction.WEST)) return DirectionArrowSymbol.WEST;
		else if (this.equals(Direction.SOUTH)) return DirectionArrowSymbol.SOUTH;
		else return ' ';
	}

	static getNameOf(direction: Direction): string {
		return Object.entries(directionNameMap).find(([, d]) => direction.equals(d))?.[0] ?? '';
	}
}

export const directionNameMap = {
	[DirectionNames.NORTH]: Direction.NORTH,
	[DirectionNames.EAST]: Direction.EAST,
	[DirectionNames.SOUTH]: Direction.SOUTH,
	[DirectionNames.WEST]: Direction.WEST,
};

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
	'': Direction.ZERO,
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
