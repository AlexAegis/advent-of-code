export type DirectionNoopLetter = ' ';

export enum CardinalDirectionValueClockwise {
	NORTH = 0,
	EAST = 1,
	SOUTH = 2,
	WEST = 3,
}

export const enum DirectionArrowSymbol {
	NORTH = '^',
	EAST = '>',
	SOUTH = 'v',
	WEST = '<',
}

export const enum DirectionCardinalGeographicLetter {
	NORTH = 'N',
	EAST = 'E',
	SOUTH = 'S',
	WEST = 'W',
}

export const enum DirectionCardinalLiteralLetter {
	NORTH = 'U',
	EAST = 'R',
	SOUTH = 'D',
	WEST = 'L',
}

export type DirectionMarker =
	| DirectionArrowSymbol
	| DirectionCardinalGeographicLetter
	| DirectionCardinalLiteralLetter;

export const isDirectionArrowSymbol = (
	marker: string
): marker is DirectionCardinalGeographicLetter =>
	marker === DirectionArrowSymbol.NORTH ||
	marker === DirectionArrowSymbol.EAST ||
	marker === DirectionArrowSymbol.SOUTH ||
	marker === DirectionArrowSymbol.WEST;

export const isDirectionCardinalGeographicLetter = (marker: string): marker is DirectionMarker =>
	marker === DirectionCardinalLiteralLetter.NORTH ||
	marker === DirectionCardinalLiteralLetter.EAST ||
	marker === DirectionCardinalLiteralLetter.SOUTH ||
	marker === DirectionCardinalLiteralLetter.WEST;

export const isDirectionCardinalLiteralLetter = (
	marker: string
): marker is DirectionCardinalLiteralLetter =>
	marker === DirectionCardinalGeographicLetter.NORTH ||
	marker === DirectionCardinalGeographicLetter.EAST ||
	marker === DirectionCardinalGeographicLetter.SOUTH ||
	marker === DirectionCardinalGeographicLetter.WEST;

export const isDirectionMarker = (marker: string): marker is DirectionMarker =>
	isDirectionArrowSymbol(marker) ||
	isDirectionCardinalGeographicLetter(marker) ||
	isDirectionCardinalLiteralLetter(marker);
