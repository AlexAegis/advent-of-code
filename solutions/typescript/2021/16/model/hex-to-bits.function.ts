export const hexToBits = (hex: string): string =>
	[...hex].map((char) => parseInt(char, 16).toString(2).padStart(4, '0')).join('');
