/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Interval } from '@alexaegis/advent-of-code-lib';

export const matchingNodes = (a: string[], b: string[]): number => {
	return a.zip(b).filter(([an, bn]) => an === bn).length;
};

export const findReflectivePairings = (
	interval: Interval,
	reflectionOrigin: number,
): [number, number][] => {
	return reflectionOrigin
		.interval(interval.high)
		.collectValues()
		.filterMap((right) => {
			const left = reflectionOrigin - (right - reflectionOrigin);
			return left >= interval.low ? [left, right + 1] : undefined;
		});
};

export const findReflection = (
	matrix: string[][],
	smudges = 0,
	skip?: number,
): number | undefined => {
	const axisInterval = Interval.closed(0, matrix.length - 1);
	const otherAxisInterval = Interval.closed(0, matrix[0]!.length - 1);

	return axisInterval.collectValues().find((index) => {
		if (skip !== undefined && index === skip) {
			return false;
		}

		const pairs = findReflectivePairings(axisInterval, index);

		if (pairs.length === 0) {
			return false;
		}

		const matching = pairs
			.map(([left, right]) => {
				const leftNodes = matrix[left]!;
				const rightNodes = matrix[right]!;
				return matchingNodes(leftNodes, rightNodes);
			})
			.sum();

		return matching + smudges === pairs.length * otherAxisInterval.length;
	});
};
