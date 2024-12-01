import { BoundingBox, task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { interpret } from './interpret.function.js';

export interface Args {
	limit: number;
}

/**
 *
 * @param input in this task the input is slightly modified. There were extra data in the
 * description of the task so I added that as the first line of the input.
 */
export const p2 = (input: string, args: Args | undefined): number | undefined => {
	const points = interpret(input);
	const aabb = BoundingBox.fromVectors(points);

	let area = 0;

	for (const x of aabb.horizontal.iter()) {
		for (const y of aabb.vertical.iter()) {
			if (
				points.map((a) => a.manhattan(x, y)).reduce((acc, next) => (acc += next)) <
				(args ? args.limit : 0)
			) {
				area++;
			}
		}
	}
	return area;
};

await task(p2, packageJson.aoc); // 42998 ~46ms
