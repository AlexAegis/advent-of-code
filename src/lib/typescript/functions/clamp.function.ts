export const clamp = (a: number, high = 1, low: number = -high, mid = 0): number => {
	if (a > mid) return high;
	else if (a < mid) return low;
	else return mid;
};
