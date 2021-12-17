export const enum DirectionArrowSymbol {
	NORTH = '^',
	EAST = '>',
	SOUTH = 'v',
	WEST = '<',
}

export type HorizontalDirectionArrowSymbol = DirectionArrowSymbol.EAST | DirectionArrowSymbol.WEST;
export type VericalDirectionArrowSymbol = DirectionArrowSymbol.NORTH | DirectionArrowSymbol.NORTH;

export const isHorizontalDirectionArrowSymbol = (
	symbol: string
): symbol is HorizontalDirectionArrowSymbol =>
	symbol === DirectionArrowSymbol.EAST || symbol === DirectionArrowSymbol.WEST;

export const isVericalDirectionArrowSymbol = (
	symbol: string
): symbol is VericalDirectionArrowSymbol =>
	symbol === DirectionArrowSymbol.NORTH || symbol === DirectionArrowSymbol.SOUTH;

export const isDirectionArrowSymbol = (symbol: string): symbol is DirectionArrowSymbol =>
	isHorizontalDirectionArrowSymbol(symbol) || isVericalDirectionArrowSymbol(symbol);
