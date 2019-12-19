import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { hasBeam } from './part_one';

export const runner = (input: string) => {
	const tape = parse(input);
	const targetSide = 100 - 1;
	let prevX = 0;
	for (let y = targetSide + 1; y < 5000; y++) {
		let startedTrackingAt!: number;
		let x = prevX;
		while (startedTrackingAt === undefined) {
			if (hasBeam(tape, x, y)) {
				startedTrackingAt = x;
				prevX = x;
			} else {
				x++;
			}
		}

		if (hasBeam(tape, x + targetSide, y - targetSide)) {
			return x * 10000 + y - targetSide;
		}
	}

	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 17302065 ~905ms
}
