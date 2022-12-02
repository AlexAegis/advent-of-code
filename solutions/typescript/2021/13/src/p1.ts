import { task } from '@alexaegis/advent-of-code-lib';
import { Vec2, Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const [points, foldInstructions] = input.split(/\n\n/);
	const vectors = points.lines().map((line) => new Vec2(line as Vec2String));

	const [, instruction] = foldInstructions.lines()[0].split(/fold along /);
	const [axis, value] = instruction.split(/=/) as [axis: 'x' | 'y', value: number];

	const [, toFold] = vectors.partition((vec) => vec[axis] < value);
	for (const vec of toFold) {
		const distance = Math.abs(vec[axis] - value);
		vec[axis] = vec[axis] - distance * 2;
	}
	return vectors.unique((a, b) => a.equals(b)).length;
};

await task(p1, packageJson.aoc); // 775 ~1.88ms
