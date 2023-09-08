export const enum DirectionCardinalGeographicLetter {
	NORTH = 'N',
	EAST = 'E',
	SOUTH = 'S',
	WEST = 'W',
}

export type HorizontalDirectionCardinalGeographicLetter =
	| DirectionCardinalGeographicLetter.EAST
	| DirectionCardinalGeographicLetter.WEST;
export type VericalDirectionCardinalGeographicLetter = DirectionCardinalGeographicLetter.NORTH;

export const isHorizontalDirectionCardinalGeographicLetter = (
	symbol: string,
): symbol is HorizontalDirectionCardinalGeographicLetter =>
	symbol === (DirectionCardinalGeographicLetter.EAST as string) ||
	symbol === (DirectionCardinalGeographicLetter.WEST as string);

export const isVericalDirectionCardinalGeographicLetter = (
	symbol: string,
): symbol is VericalDirectionCardinalGeographicLetter =>
	symbol === (DirectionCardinalGeographicLetter.NORTH as string) ||
	symbol === (DirectionCardinalGeographicLetter.SOUTH as string);

export const isDirectionCardinalGeographicLetter = (
	marker: string,
): marker is DirectionCardinalGeographicLetter =>
	isHorizontalDirectionCardinalGeographicLetter(marker) ||
	isVericalDirectionCardinalGeographicLetter(marker);
