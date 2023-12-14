import {
	DOUBLE_NEWLINE,
	GridGraph,
	GridGraphNode,
	task,
	type ToString,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

/**
 * @deprecated use the one on the graph
 */
const getColumn = <T extends ToString = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	gg: GridGraph<T, N>,
	column: number,
): N[] | undefined => {
	const aabb = gg.boundingBox();
	return aabb.horizontal.contains(column)
		? aabb.vertical.map((row) => {
				const node = gg.getNode({ x: column, y: row });
				if (!node) {
					throw new Error(`problem while fetching row: ${row} column: ${column}`);
				}
				return node;
			})
		: undefined;
};

/**
 * @deprecated use the one on the graph
 */
const getRow = <T extends ToString = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	gg: GridGraph<T, N>,
	row: number,
): N[] | undefined => {
	const aabb = gg.boundingBox();
	return aabb.vertical.contains(row)
		? aabb.horizontal.map((column) => {
				const node = gg.getNode({ x: column, y: row });
				if (!node) {
					throw new Error(`problem while fetching row: ${row} column: ${column}`);
				}
				return node;
			})
		: undefined;
};

const matchingNodes = <T extends ToString = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	a: N[],
	b: N[],
): boolean => {
	return a.zip(b).every(([an, bn]) => an.value === bn.value);
};

export const findReflectivePairings = (
	low: number,
	high: number,
	reflectionOrigin: number,
): [number, number][] => {
	return reflectionOrigin
		.interval(high)
		.collectValues()
		.filterMap((right) => {
			const left = reflectionOrigin - (right - reflectionOrigin);
			return left >= low ? [left, right + 1] : undefined;
		});
};

const findColumnReflection = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	gg: GridGraph<T, N>,
): number | undefined => {
	const aabb = gg.boundingBox();
	return aabb.horizontal.collectValues().find((column) => {
		const pairs = findReflectivePairings(aabb.horizontal.low, aabb.horizontal.high, column);
		return (
			pairs.length > 0 &&
			pairs.every(([left, right]) => {
				const leftColumn = getColumn(gg, left);
				const rightColumn = getColumn(gg, right);
				return !leftColumn || !rightColumn || matchingNodes<T, N>(leftColumn, rightColumn);
			})
		);
	});
};

const findRowReflection = <
	T extends ToString = string,
	N extends GridGraphNode<T> = GridGraphNode<T>,
>(
	gg: GridGraph<T, N>,
): number | undefined => {
	const aabb = gg.boundingBox();
	return aabb.vertical.collectValues().find((row) => {
		const pairs = findReflectivePairings(aabb.vertical.low, aabb.vertical.high, row);
		return (
			pairs.length > 0 &&
			pairs.every(([top, bottom]) => {
				const topRow = getRow(gg, top);
				const bottomRow = getRow(gg, bottom);
				return !topRow || !bottomRow || matchingNodes<T, N>(topRow, bottomRow);
			})
		);
	});
};

export const p1 = (input: string): number => {
	return input
		.split(DOUBLE_NEWLINE)
		.map((m) => m.toGridGraph())
		.map((gg) => {
			const columnReflectionIndex = findColumnReflection(gg);
			const rowReflectionIndex = findRowReflection(gg);
			console.log('verticalReflectionIndex', columnReflectionIndex);
			console.log('rowReflectionIndex', rowReflectionIndex);
			let value = 0;
			if (columnReflectionIndex !== undefined) {
				value = columnReflectionIndex + 1;
			}
			if (rowReflectionIndex !== undefined) {
				value = (rowReflectionIndex + 1) * 100;
			}
			return value;
		})
		.sum();
};

await task(p1, packageJson.aoc); // 37718 ~0ms
