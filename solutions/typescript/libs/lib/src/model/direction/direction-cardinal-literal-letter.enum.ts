export const enum DirectionCardinalLiteralLetter {
	NORTH = 'U',
	EAST = 'R',
	SOUTH = 'D',
	WEST = 'L',
}

export type HorizontalDirectionCardinalLiteralLetter =
	| DirectionCardinalLiteralLetter.EAST
	| DirectionCardinalLiteralLetter.WEST;
export type VericalDirectionCardinalLiteralLetter = DirectionCardinalLiteralLetter.NORTH;

export const isHorizontalDirectionCardinalLiteralLetter = (
	symbol: string,
): symbol is HorizontalDirectionCardinalLiteralLetter =>
	symbol === (DirectionCardinalLiteralLetter.EAST as string) ||
	symbol === (DirectionCardinalLiteralLetter.WEST as string);

export const isVericalDirectionCardinalLiteralLetter = (
	symbol: string,
): symbol is VericalDirectionCardinalLiteralLetter =>
	symbol === (DirectionCardinalLiteralLetter.NORTH as string) ||
	symbol === (DirectionCardinalLiteralLetter.SOUTH as string);

export const isDirectionCardinalLiteralLetter = (
	marker: string,
): marker is DirectionCardinalLiteralLetter =>
	isHorizontalDirectionCardinalLiteralLetter(marker) ||
	isVericalDirectionCardinalLiteralLetter(marker);
