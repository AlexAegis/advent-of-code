import { bench, read } from '@lib';
import { rotateArrayTimes } from '@lib/functions';
import { asc, max } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number => {
	// const seed = parseInt(input, 10);
	const circle = input.split('').map((s) => parseInt(s, 10));
	//let current = 0;
	console.log(JSON.stringify(circle));
	const high = circle.reduce(max);
	// const low = circle.reduce(min);
	let nextLabel = high + 1;
	while (circle.length !== 1000000) {
		circle.push(nextLabel);
		nextLabel++;
	}

	//console.log(JSON.stringify(circle));
	for (let i = 0; i < 10000000; i++) {
		// 100 moves from the crab
		const firstThree = circle.splice(1, 3);

		const rollerWheel = [...circle].sort(asc);
		while (rollerWheel[0] !== circle[0]) {
			rotateArrayTimes(rollerWheel, 1);
		}
		const target = rollerWheel.pop();
		const destinationIndex = circle.findIndex((c) => c === target);
		//console.log('circle', JSON.stringify(circle));
		//console.log('rollerWheel', JSON.stringify(rollerWheel));
		//console.log('destinationIndex', destinationIndex);
		circle.splice(destinationIndex + 1, 0, ...firstThree);

		rotateArrayTimes(circle, 1);
		//console.log('cups', target, JSON.stringify(firstThree), JSON.stringify(circle));
		//console.log('pick up: ', JSON.stringify(firstThree));
		//console.log('dest', destinationIndex, 'val', destination);
		//if (Math.floor(i / 1000) === i / 1000) {
		//}
		if (i.toString().endsWith('00')) {
			console.log('i.', i);
		}
	}
	while (circle[0] !== 1) {
		rotateArrayTimes(circle, 1);
	}
	circle.shift();
	const one = circle.shift()!;
	const other = circle.shift()!;
	console.log('one', one, 'other', other);
	return one * other;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
