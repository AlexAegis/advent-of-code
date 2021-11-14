export type Triangle = [number, number, number];

export const isTriangle = ([a, b, c]: [number, number, number]): boolean => {
	const ab = a + b;
	const bc = b + c;
	const ca = c + a;
	return ab > c && bc > a && ca > b;
};
