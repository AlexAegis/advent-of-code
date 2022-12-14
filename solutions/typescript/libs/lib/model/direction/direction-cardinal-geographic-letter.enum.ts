export const enum DirectionCardinalGeographicLetter {
	NORTH = 'N',
	EAST = 'E',
	SOUTH = 'S',
	WEST = 'W',
}

export type HorizontalDirectionCardinalGeographicLetter =
	| DirectionCardinalGeographicLetter.EAST
	| DirectionCardinalGeographicLetter.WEST;
export type VericalDirectionCardinalGeographicLetter =
	| DirectionCardinalGeographicLetter.NORTH
	| DirectionCardinalGeographicLetter.NORTH;

export const isHorizontalDirectionCardinalGeographicLetter = (
	symbol: string
): symbol is HorizontalDirectionCardinalGeographicLetter =>
	symbol === DirectionCardinalGeographicLetter.EAST ||
	symbol === DirectionCardinalGeographicLetter.WEST;

export const isVericalDirectionCardinalGeographicLetter = (
	symbol: string
): symbol is VericalDirectionCardinalGeographicLetter =>
	symbol === DirectionCardinalGeographicLetter.NORTH ||
	symbol === DirectionCardinalGeographicLetter.SOUTH;

export const isDirectionCardinalGeographicLetter = (
	marker: string
): marker is DirectionCardinalGeographicLetter =>
	isHorizontalDirectionCardinalGeographicLetter(marker) ||
	isVericalDirectionCardinalGeographicLetter(marker);
