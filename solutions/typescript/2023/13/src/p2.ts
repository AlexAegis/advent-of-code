import {
	DOUBLE_NEWLINE,
	GridGraph,
	GridGraphNode,
	Vec2,
	task,
	type ToString,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';

const getColumn = <T extends ToString = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	gg: GridGraph<T, N>,
	column: number,
): string[] | undefined => {
	const aabb = gg.boundingBox();
	return aabb.horizontal.contains(column)
		? aabb.vertical.map((row) => {
				const node = gg.getNode({ x: column, y: row });
				if (!node) {
					throw new Error(`problem while fetching row: ${row} column: ${column}`);
				}
				return node.value.toString();
			})
		: undefined;
};

const getRow = <T extends ToString = string, N extends GridGraphNode<T> = GridGraphNode<T>>(
	gg: GridGraph<T, N>,
	row: number,
): string[] | undefined => {
	const aabb = gg.boundingBox();
	return aabb.vertical.contains(row)
		? aabb.horizontal.map((column) => {
				const node = gg.getNode({ x: column, y: row });
				if (!node) {
					throw new Error(`problem while fetching row: ${row} column: ${column}`);
				}
				return node.value.toString();
			})
		: undefined;
};

const matchingNodes = (a: string[], b: string[]): boolean => {
	return a.zip(b).every(([an, bn]) => an === bn);
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
				return !leftColumn || !rightColumn || matchingNodes(leftColumn, rightColumn);
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
				return !topRow || !bottomRow || matchingNodes(topRow, bottomRow);
			})
		);
	});
};

export const p2 = (input: string): number => {
	return input
		.split(DOUBLE_NEWLINE)
		.map((m) => m.toGridGraph())
		.map((gg) => {
			gg.print();
			console.log('----');
			let columnReflectionIndex: number | undefined = undefined;
			let rowReflectionIndex: number | undefined = undefined;

			const unsmudgedRowIndex = findRowReflection(gg);
			const unsmudgedColumnIndex = findColumnReflection(gg);
			console.log(
				'unsmudgedRowIndex',
				unsmudgedRowIndex,
				'unsmudgedColumnIndex',
				unsmudgedColumnIndex,
			);

			const possibleSmudges = gg.boundingBox().renderIntoVectors();
			possibleSmudges.sort((b, a) =>
				a.manhattan({ x: unsmudgedColumnIndex ?? b.x, y: unsmudgedRowIndex ?? b.y }),
			);

			let smudge: Vec2 | undefined = undefined;
			for (const possibleSmudge of possibleSmudges) {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				const smudgyNode = gg.getNode(possibleSmudge)!;
				const originalNodeValue = smudgyNode.value.toString();
				smudgyNode.setValue(originalNodeValue.toString() === '.' ? '#' : '.');

				const nextRowReflectionIndex = findRowReflection(gg);
				const nextColumnReflectionIndex = findColumnReflection(gg);

				if (
					nextRowReflectionIndex === unsmudgedRowIndex &&
					nextColumnReflectionIndex === unsmudgedColumnIndex
				) {
					smudgyNode.setValue(originalNodeValue);

					continue;
				}
				console.log(
					'smudge at',
					possibleSmudge.toString(),
					'nextRowReflectionIndex',
					nextRowReflectionIndex,
					'nextColumnReflectionIndex',
					nextColumnReflectionIndex,
				);

				if (
					nextRowReflectionIndex !== undefined ||
					nextColumnReflectionIndex !== undefined
				) {
					gg.print();
					smudge = possibleSmudge;
					rowReflectionIndex = nextRowReflectionIndex;
					columnReflectionIndex = nextColumnReflectionIndex;
					smudgyNode.setValue(originalNodeValue);
					break;
				}
				smudgyNode.setValue(originalNodeValue);
			}

			if (!smudge) {
				columnReflectionIndex = unsmudgedColumnIndex;
				rowReflectionIndex = unsmudgedRowIndex;

				//	throw new Error('Should be exactly 1 smudge');
			}
			console.log('!!!!!!!!! Smudge found! (examp1, 0,0 and 1,4)', smudge?.toString());

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

await task(p2, packageJson.aoc); // 0 ~0ms
// too high 43113
