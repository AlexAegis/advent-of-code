export const enum DirectionCardinalLiteralLetter {
	NORTH = 'U',
	EAST = 'R',
	SOUTH = 'D',
	WEST = 'L',
}

export type HorizontalDirectionCardinalLiteralLetter =
	| DirectionCardinalLiteralLetter.EAST
	| DirectionCardinalLiteralLetter.WEST;
export type VericalDirectionCardinalLiteralLetter =
	| DirectionCardinalLiteralLetter.NORTH
	| DirectionCardinalLiteralLetter.NORTH;

export const isHorizontalDirectionCardinalLiteralLetter = (
	symbol: string
): symbol is HorizontalDirectionCardinalLiteralLetter =>
	symbol === DirectionCardinalLiteralLetter.EAST ||
	symbol === DirectionCardinalLiteralLetter.WEST;

export const isVericalDirectionCardinalLiteralLetter = (
	symbol: string
): symbol is VericalDirectionCardinalLiteralLetter =>
	symbol === DirectionCardinalLiteralLetter.NORTH ||
	symbol === DirectionCardinalLiteralLetter.SOUTH;

export const isDirectionCardinalLiteralLetter = (
	marker: string
): marker is DirectionCardinalLiteralLetter =>
	isHorizontalDirectionCardinalLiteralLetter(marker) ||
	isVericalDirectionCardinalLiteralLetter(marker);
