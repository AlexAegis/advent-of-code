import { bench, read } from '@lib';
import { rotateArrayTimes } from '@lib/functions';
import { asc } from '@lib/math';
import { day, year } from '.';

export const runner = (iterationCount = 100) => (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner())}`))(); // 74698532 ~0.08ms
}
