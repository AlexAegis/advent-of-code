import { DOUBLE_NEWLINE, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { findReflection } from './internal/matrix-reflection.js';

export const p2 = (input: string): number => {
	return input
		.split(DOUBLE_NEWLINE)
		.map((m) => m.toGridGraph())
		.map((graph) => {
			const smudgyRowIndex = findReflection(graph, 'row');
			const smudgyColumnIndex = findReflection(graph, 'column');
			const rowIndex = findReflection(graph, 'row', 1, smudgyRowIndex);
			const columnIndex = findReflection(graph, 'column', 1, smudgyColumnIndex);

			let value = 0;
			if (columnIndex !== undefined) {
				value = columnIndex + 1;
			}
			if (rowIndex !== undefined) {
				value = (rowIndex + 1) * 100;
			}
			return value;
		})
		.sum();
};

await task(p2, packageJson.aoc); // 40995 ~658.23ms
