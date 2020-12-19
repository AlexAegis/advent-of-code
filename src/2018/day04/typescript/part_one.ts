import { bench, read } from '@lib';
import { day, year } from '.';
import { interpret } from './interpret.function';

export const runner = (input: string): number | undefined => {
	const guards: Map<number, Map<number, number>> = new Map();
	let currentGuard = -1;
	let asleepAt: number | undefined;
	const events = interpret(input);
	for (const event of events) {
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
			if (sleepMap !== undefined && asleepAt !== undefined) {
				for (let i = asleepAt; i < event.minute; i++) {
					const si = sleepMap.get(i);
					sleepMap.set(i, (si !== undefined ? si : 0) + 1);
				}
			}
			asleepAt = undefined;
		}
	}

	let mostSlept = -1;
	let mostSleptGuard = -1;
	[...guards].forEach(([guard, sleepMap]) => {
		if (sleepMap.size > 0) {
			const totalSleep: [number, number] = [...sleepMap].reduce(
				([prevMinute, prevSleep], [currMin, currSleep]): [number, number] => {
					return [prevMinute < currMin ? currMin : prevMinute, prevSleep + currSleep];
				}
			);
			if (totalSleep[1] > mostSlept) {
				mostSlept = totalSleep[1];
				mostSleptGuard = guard;
			}
		}
	});
	console.log(`Guard who slept the most: ${mostSleptGuard} with a total of: ${mostSlept}`);

	const mostSleptSleepMap = guards.get(mostSleptGuard);

	if (mostSleptSleepMap) {
		const mostSleptMinute: [number, number] = [...mostSleptSleepMap].reduce(
			([prevMinute, prevSleep], [currMin, currSleep]): [number, number] => {
				return [prevSleep < currSleep ? currMin : prevMinute, currSleep];
			}
		);

		console.log(
			`He slept the most at the ${mostSleptMinute[0]} minute mark, for ${mostSleptMinute[1]} times.`
		);
		return mostSleptGuard * mostSleptMinute[0];
	} else {
		return undefined;
	}
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 106710 ~6ms
}
