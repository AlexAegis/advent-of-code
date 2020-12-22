/**
 * Generates a fixed size tile out of a base tile
 *
 * @param width of the tile to be generated
 * @param height of the tile to be generated
 * @param base the base string to be repeated
 */
export const generateStringTile = (width: number, height: number, base = '_'): string =>
	(base.repeat(width) + '\n').repeat(height);
