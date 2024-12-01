import { DOUBLE_NEWLINE, isNotNullish, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { findReflection } from './internal/matrix-reflection.js';

export const p1 = (input: string): number =>
	input
		.split(DOUBLE_NEWLINE)
		.map((m) => m.toMatrix())
		.map((matrix) => {
			const rowWise = matrix;
			const columnWise = matrix.rotateMatrix('r');
			const rowReflectionIndex = findReflection(rowWise);
			const columnReflectionIndex = findReflection(columnWise);

			if (isNotNullish(columnReflectionIndex)) {
				return columnReflectionIndex + 1;
			} else if (isNotNullish(rowReflectionIndex)) {
				return (rowReflectionIndex + 1) * 100;
			} else {
				throw new Error('Reflection not found');
			}
		})
		.sum();

await task(p1, packageJson.aoc); // 37718 ~2.59ms
