import { bench, read } from '@lib';
import { day, year } from '.';
import { interpret } from './interpret.function';

export const runner = (input: string): number => {
	const guards: Map<number, Map<number, number>> = new Map();
	let currentGuard = -1;
	let asleepAt: number | undefined;
	const o = interpret(input);
	for (const event of o) {
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
			if (sleepMap && asleepAt !== undefined) {
				for (let i = asleepAt; i < event.minute; i++) {
					const sm = sleepMap.get(i);
					sleepMap.set(i, (sm ? sm : 0) + 1);
				}
			}
			asleepAt = undefined;
		}
	}

	let mostSleptGuard = -1;
	let mostSlept = -1;
	let mostSleptMinute = -1;

	[...guards].forEach(([guard, sleepMap]) => {
		if (sleepMap.size > 0) {
			const mostSleptMinutePair: [number, number] = [...sleepMap].reduce(
				([prevMinute, prevSleep], [currMin, currSleep]): [number, number] => {
					return [
						prevSleep < currSleep ? currMin : prevMinute,
						prevSleep < currSleep ? currSleep : prevSleep,
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 10491 ~4ms
}
