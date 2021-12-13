import { bench, read } from '@lib';
import { renderVectors } from '@lib/functions';
import { Vec2 } from '@lib/model';
import { day, year } from '.';

export const runner = (input: string): string => {
	const [points, foldInstructions] = input.split(/\n\n/);
	const vectors = points.lines().map((line) => new Vec2(line));

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // REUPUPKR ~1.21ms
}
