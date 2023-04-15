import type { Comparator } from '@alexaegis/advent-of-code-lib';

export type Signal = number | Signal[];

const wrapIntoArrayIfNot = <T>(t: T | T[]): T[] => {
	if (Array.isArray(t)) {
		return t;
	} else {
		return [t];
	}
};

export const signalComparator: Comparator<Signal> = (a: Signal, b: Signal): number => {
	if (Array.isArray(a) && Array.isArray(b)) {
		let i = 0;
		let result = 0;
		while (result === 0 && i < b.length && i < a.length) {
			result = signalComparator(a[i]!, b[i]!);
			i++;
		}

		if (result === 0) {
			return a.length - b.length;
		} else {
			return result;
		}
	} else if (typeof a === 'number' && typeof b === 'number') {
		return a - b;
	} else {
		return signalComparator(wrapIntoArrayIfNot(a), wrapIntoArrayIfNot(b));
	}
};
