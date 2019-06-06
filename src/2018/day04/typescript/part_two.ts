import { interpret } from './interpret.function';
import { bench, reader } from '@root';
import { year, day } from '.';

export const runner = async (input: string) => {
	const guards: Map<number, Map<number, number>> = new Map();
	let currentGuard: number;
	let asleepAt: number;
	let o = await interpret(input);
	for (let event of o) {
		if (event.guard) {
			currentGuard = event.guard;
			if (!guards.has(currentGuard)) {
				guards.set(currentGuard, new Map());
			}
			asleepAt = undefined;
		} else if (event.event === 'falls asleep') {
			asleepAt = event.minute;
		} else if (event.event === 'wakes up') {
			const sleepMap = guards.get(currentGuard);
			for (let i = asleepAt; i < event.minute; i++) {
				sleepMap.set(i, (sleepMap.get(i) ? sleepMap.get(i) : 0) + 1);
			}
			asleepAt = undefined;
		}
	}

	let mostSleptGuard: number = -1;
	let mostSlept: number = -1;
	let mostSleptMinute: number = -1;

	[...guards].forEach(([guard, sleepMap]) => {
		if (sleepMap.size > 0) {
			const mostSleptMinutePair: [number, number] = [...sleepMap].reduce(
				([prevMinute, prevSleep], [currMin, currSleep]): [number, number] => {
					return [
						prevSleep < currSleep ? currMin : prevMinute,
						prevSleep < currSleep ? currSleep : prevSleep
					];
				}
			);
			if (mostSleptMinutePair[1] > mostSlept) {
				mostSleptMinute = mostSleptMinutePair[0];
				mostSlept = mostSleptMinutePair[1];
				mostSleptGuard = guard;
			}
		}
	});
	return mostSleptGuard * mostSleptMinute;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 10491 ~4.6ms
}
