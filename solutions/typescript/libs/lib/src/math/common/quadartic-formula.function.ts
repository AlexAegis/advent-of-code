export const quadratic = (a: number, b: number, c: number): [number, number] => {
	const sqrt = Math.sqrt(Math.pow(b, 2) - 4 * a * c);
	return [((-b - sqrt) / 2) * a, ((-b + sqrt) / 2) * a];
};
