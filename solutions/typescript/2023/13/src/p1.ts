import { DOUBLE_NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findReflection } from './internal/matrix-reflection.js';

export const p1 = (input: string): number =>
	input
		.split(DOUBLE_NEWLINE)
		.map((m) => m.toGridGraph())
		.map((graph) => {
			const columnReflectionIndex = findReflection(graph, 'column');
			const rowReflectionIndex = findReflection(graph, 'row');

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

await task(p1, packageJson.aoc); // 37718 ~371.96ms
