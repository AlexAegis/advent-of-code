export enum DirectionCardinalNumericClockwiseIndex {
	NORTH = 0,
	EAST = 1,
	SOUTH = 2,
	WEST = 3,
}

export type HorizontalDirectionCardinalNumericClockwiseIndex =
	| DirectionCardinalNumericClockwiseIndex.EAST
	| DirectionCardinalNumericClockwiseIndex.WEST;
export type VericalDirectionCardinalNumericClockwiseIndex =
	| DirectionCardinalNumericClockwiseIndex.NORTH
	| DirectionCardinalNumericClockwiseIndex.NORTH;

export const isHorizontalDirectionCardinalNumericClockwiseIndex = (
	index: number
): index is HorizontalDirectionCardinalNumericClockwiseIndex =>
	index === DirectionCardinalNumericClockwiseIndex.EAST ||
	index === DirectionCardinalNumericClockwiseIndex.WEST;

export const isVericalDirectionCardinalNumericClockwiseIndex = (
	index: number
): index is VericalDirectionCardinalNumericClockwiseIndex =>
	index === DirectionCardinalNumericClockwiseIndex.NORTH ||
	index === DirectionCardinalNumericClockwiseIndex.SOUTH;

export const isDirectionCardinalNumericClockwiseIndex = (
	index: number
): index is DirectionCardinalNumericClockwiseIndex =>
	isHorizontalDirectionCardinalNumericClockwiseIndex(index) ||
	isVericalDirectionCardinalNumericClockwiseIndex(index);
