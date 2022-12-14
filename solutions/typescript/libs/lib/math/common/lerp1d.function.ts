export interface Lerp1DOptions {
	excludeStart: boolean;
	excludeEnd: boolean;
}

export const lerp1D = (from: number, to: number, options?: Lerp1DOptions): number[] => {
	const lower = Math.min(from, to);
	const higher = Math.max(from, to);

	const start = options?.excludeStart ? lower + 1 : lower;
	const end = options?.excludeEnd ? higher - 1 : higher;

	if (start > end) {
		return [];
	}

	const result: number[] = [];
	for (let i = start; i <= end; i++) {
		result.push(i);
	}
	return result;
};
