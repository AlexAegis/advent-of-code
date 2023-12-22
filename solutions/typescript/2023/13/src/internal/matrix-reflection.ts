/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { GridGraph, GridGraphNode, Interval, ToString } from '@alexaegis/advent-of-code-lib';

export const matchingNodes = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	a: N[],
	b: N[],
): number => {
	return a.zip(b).filter(([an, bn]) => an.value === bn.value).length;
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

export const findReflection = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	gg: GridGraph<T, N>,
	axis: 'row' | 'column',
	smudges = 0,
	skip?: number,
): number | undefined => {
	const aabb = gg.boundingBox();
	const axisInterval = axis === 'column' ? aabb.horizontal : aabb.vertical;
	const otherAxistInterval = axis === 'column' ? aabb.vertical : aabb.horizontal;
	const getNodesOfAxis = (n: number) => (axis === 'column' ? gg.getColumn(n) : gg.getRow(n));
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
				const leftNodes = getNodesOfAxis(left)!;
				const rightNodes = getNodesOfAxis(right)!;
				return matchingNodes<T, N>(leftNodes, rightNodes);
			})
			.sum();

		return matching + smudges === pairs.length * otherAxistInterval.length;
	});
};
