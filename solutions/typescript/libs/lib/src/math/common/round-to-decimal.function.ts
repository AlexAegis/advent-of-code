export const roundToDecimal = (n: number, decimal: number): number => {
	return Number.parseFloat(
		Math.round(Number.parseFloat(`${n.toString()}e+${decimal}`)) + `e-${decimal}`,
	);
};
