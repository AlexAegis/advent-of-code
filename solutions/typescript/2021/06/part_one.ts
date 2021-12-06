import { bench, read } from '@lib';
import { day, year } from '.';

class LanternFish {
	constructor(public timer = 8) {}
	next(): LanternFish | undefined {
		if (this.timer === 0) {
			this.timer = 6;
			return new LanternFish();
		} else {
			this.timer--;
			return undefined;
		}
	}
}

export const runner = (input: string, maxDay = 80): number => {
	const fishes = input.splitToInt({ delimiter: /,/ }).map((time) => new LanternFish(time));
	let day = 0;
	while (day < maxDay) {
		const next = fishes
			.map((fish) => fish.next())
			.filter((next): next is LanternFish => !!next);
		fishes.push(...next);
		day++;
	}
	return fishes.length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 361169 ~118.92ms
}
