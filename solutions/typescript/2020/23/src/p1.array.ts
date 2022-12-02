import { task } from '@alexaegis/advent-of-code-lib';
import { rotateArrayTimes } from '@alexaegis/advent-of-code-lib/functions';
import { asc } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p1array =
	(iterationCount = 100) =>
	(input: string): number => {
		const circle = input.split('').map((s) => parseInt(s, 10));
		for (let i = 0; i < iterationCount; i++) {
			const firstThree = circle.splice(1, 3);
			const rollerWheel = [...circle].sort(asc);
			while (rollerWheel[0] !== circle[0]) {
				rotateArrayTimes(rollerWheel, 1);
			}
			const target = rollerWheel.pop();
			const destinationIndex = circle.findIndex((c) => c === target);
			circle.splice(destinationIndex + 1, 0, ...firstThree);
			rotateArrayTimes(circle, 1);
		}
		while (circle[0] !== 1) {
			rotateArrayTimes(circle, 1);
		}
		circle.shift();
		return parseInt(circle.join(''), 10);
	};

await task(p1array(), packageJson.aoc); // 74698532 ~0.08ms
