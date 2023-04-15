export const enum DirectionArrowUnicodeSymbol {
	NORTH = '↑',
	EAST = '→',
	SOUTH = '↓',
	WEST = '←',
}

export type HorizontalDirectionArrowUnicodeSymbol =
	| DirectionArrowUnicodeSymbol.EAST
	| DirectionArrowUnicodeSymbol.WEST;

export type VericalDirectionArrowUnicodeSymbol =
	| DirectionArrowUnicodeSymbol.NORTH
	| DirectionArrowUnicodeSymbol.NORTH;

export const isHorizontalDirectionArrowUnicodeSymbol = (
	symbol: string
): symbol is HorizontalDirectionArrowUnicodeSymbol =>
	symbol === DirectionArrowUnicodeSymbol.EAST || symbol === DirectionArrowUnicodeSymbol.WEST;

export const isVericalDirectionArrowUnicodeSymbol = (
	symbol: string
): symbol is VericalDirectionArrowUnicodeSymbol =>
	symbol === DirectionArrowUnicodeSymbol.NORTH || symbol === DirectionArrowUnicodeSymbol.SOUTH;

export const isDirectionArrowUnicodeSymbol = (
	symbol: string
): symbol is DirectionArrowUnicodeSymbol =>
	isHorizontalDirectionArrowUnicodeSymbol(symbol) || isVericalDirectionArrowUnicodeSymbol(symbol);
