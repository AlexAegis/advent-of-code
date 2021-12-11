import { bench, read } from '@lib';
import { day, year } from '.';
import { next } from './part_one';

export const runner = (input: string): number => {
	const om = input.toVectorMap((s) => s.tryInt());
	let step = 0;
	for (;;) {
		step++;
		const flashes = next(om);
		if (flashes === om.size) {
			break;
		}
	}
	return step;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 351 ~31.29ms
}
