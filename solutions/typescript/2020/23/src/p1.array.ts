import { task } from '@alexaegis/advent-of-code-lib';
import { rotateArrayTimes } from '@alexaegis/advent-of-code-lib/functions';
import { ascending } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';

export const p1array =
	(iterationCount = 100) =>
	(input: string): number => {
		const circle = [...input].map((s) => Number.parseInt(s, 10));
		for (let i = 0; i < iterationCount; i++) {
			const firstThree = circle.splice(1, 3);
			const rollerWheel = [...circle].sort(ascending);
			while (rollerWheel[0] !== circle[0]) {
				rotateArrayTimes(rollerWheel, 1);
			}
			const target = rollerWheel.pop() ?? -1;
			const destinationIndex = circle.indexOf(target);
			circle.splice(destinationIndex + 1, 0, ...firstThree);
			rotateArrayTimes(circle, 1);
		}
		while (circle[0] !== 1) {
			rotateArrayTimes(circle, 1);
		}
		circle.shift();
		return Number.parseInt(circle.join(''), 10);
	};

await task(p1array(), packageJson.aoc); // 74698532 ~0.08ms
