import { bench, read } from '@alexaegis/advent-of-code-lib';
import { renderVectors } from '@alexaegis/advent-of-code-lib/functions';
import { Vec2, Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const runner = (input: string): string => {
	const [points, foldInstructions] = input.split(/\n\n/);
	const vectors = points.lines().map((line) => new Vec2(line as Vec2String));

	const folds = foldInstructions.lines().map((line) => {
		const [, instruction] = line.split(/fold along /);
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

	return '\n' + renderVectors(vectors);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // REUPUPKR ~1.21ms
}
