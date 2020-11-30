export const enum DirectionSymbol {
	NORTH = '^',
	EAST = '>',
	SOUTH = 'v',
	WEST = '<',
}

export const enum DirectionGeographicLetter {
	NORTH = 'N',
	EAST = 'E',
	SOUTH = 'S',
	WEST = 'W',
}

export const enum DirectionLiteralLetter {
	NORTH = 'U',
	EAST = 'R',
	SOUTH = 'D',
	WEST = 'L',
}

export type DirectionMarker = DirectionSymbol | DirectionGeographicLetter | DirectionLiteralLetter;
