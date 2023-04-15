import { task } from '@alexaegis/advent-of-code-lib';
import {
	parseLetterMatrix,
	renderMatrix,
	vectorsToMatrix,
} from '@alexaegis/advent-of-code-lib/functions';
import { Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json';

export const p2 = (input: string): string => {
	const [points, foldInstructions] = input.splitIntoStringPair(/\n\n/);
	const vectors = points.lines().map((line) => new Vec2(line as Vec2String));

	const folds = foldInstructions.lines().map((line) => {
		const [, instruction] = line.splitIntoStringPair(/fold along /);
		const [axis, value] = instruction.split(/=/) as [axis: 'x' | 'y', value: number];
		return { axis, value };
	});

	for (const { axis, value } of folds) {
		const [, toFold] = vectors.partition((vec) => vec[axis] < value);
		for (const vec of toFold) {
			const distance = Math.abs(vec[axis] - value);
			vec[axis] = vec[axis] - distance * 2;
		}
	}

	const matrix = vectorsToMatrix(vectors).matrix;

	try {
		return parseLetterMatrix(matrix);
	} catch {
		return renderMatrix(matrix);
	}
};

await task(p2, packageJson.aoc); // REUPUPKR ~1.21ms
