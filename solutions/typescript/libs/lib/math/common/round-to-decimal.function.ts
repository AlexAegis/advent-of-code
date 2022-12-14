export const roundToDecimal = (n: number, decimal: number): number => {
	return parseFloat(Math.round(parseFloat(`${n.toString()}e+${decimal}`)) + `e-${decimal}`);
};
