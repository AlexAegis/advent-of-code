import { isNotNullish } from '@alexaegis/common';
import type { SizedTuple } from '../../model/sized-tuple.type.js';

export const cartesianCombinations = <T extends unknown[], I extends [...T][]>(
	...arrays: I
): SizedTuple<I[number][number], I['length']>[] => {
	const r: [...T][] = [];
	const max = arrays.length - 1;

	const cartesianHelper = (arr: T[], i: number) => {
		const row = arrays[i] as T[];
		if (isNotNullish(row)) {
			for (let j = 0, l = row.length; j < l; j++) {
				const a = [...arr];
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				a.push(row[j]!);
				if (i === max) r.push(a as [...T]);
				else cartesianHelper(a, i + 1);
			}
		}
	};

	cartesianHelper([], 0);
	return r as SizedTuple<I[number][number], I['length']>[];
};
