export const clamp = (a: number, high: number = 1, low: number = -high, mid: number = 0): number => {
	if (a > mid) return high;
	else if (a < mid) return low;
	else return mid;
};
