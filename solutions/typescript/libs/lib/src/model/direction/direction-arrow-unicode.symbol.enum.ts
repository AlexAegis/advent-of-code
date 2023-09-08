export const enum DirectionArrowUnicodeSymbol {
	NORTH = '↑',
	EAST = '→',
	SOUTH = '↓',
	WEST = '←',
}

export type HorizontalDirectionArrowUnicodeSymbol =
	| DirectionArrowUnicodeSymbol.EAST
	| DirectionArrowUnicodeSymbol.WEST;

export type VericalDirectionArrowUnicodeSymbol = DirectionArrowUnicodeSymbol.NORTH;

export const isHorizontalDirectionArrowUnicodeSymbol = (
	symbol: string,
): symbol is HorizontalDirectionArrowUnicodeSymbol =>
	symbol === (DirectionArrowUnicodeSymbol.EAST as string) ||
	symbol === (DirectionArrowUnicodeSymbol.WEST as string);

export const isVericalDirectionArrowUnicodeSymbol = (
	symbol: string,
): symbol is VericalDirectionArrowUnicodeSymbol =>
	symbol === (DirectionArrowUnicodeSymbol.NORTH as string) ||
	symbol === (DirectionArrowUnicodeSymbol.SOUTH as string);

export const isDirectionArrowUnicodeSymbol = (
	symbol: string,
): symbol is DirectionArrowUnicodeSymbol =>
	isHorizontalDirectionArrowUnicodeSymbol(symbol) || isVericalDirectionArrowUnicodeSymbol(symbol);
