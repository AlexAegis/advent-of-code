import { DOUBLE_NEWLINE, isNotNullish, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findReflection } from './internal/matrix-reflection.js';

export const p2 = (input: string): number =>
	input
		.split(DOUBLE_NEWLINE)
		.map((m) => m.toMatrix())
		.map((matrix) => {
			const rowWise = matrix;
			const columnWise = matrix.rotateMatrix('r');

			const smudgyRowIndex = findReflection(rowWise);
			const smudgyColumnIndex = findReflection(columnWise);
			const rowIndex = findReflection(rowWise, 1, smudgyRowIndex);
			const columnIndex = findReflection(columnWise, 1, smudgyColumnIndex);

			if (isNotNullish(columnIndex)) {
				return columnIndex + 1;
			} else if (isNotNullish(rowIndex)) {
				return (rowIndex + 1) * 100;
			} else {
				throw new Error('Reflection not found');
			}
		})
		.sum();

await task(p2, packageJson.aoc); // 40995 ~4.95ms
