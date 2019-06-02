import { interpret } from './interpret.function';
import { bench } from '@root/bench.function';
import { reader } from '@root/reader.function';

export const runner = async (input: string) => {
	const guards: Map<number, Map<number, number>> = new Map();
	let currentGuard: number;
	let asleepAt: number;
	let events = await interpret(input);
	for (let event of events) {
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

	let mostSlept: number = -1;
	let mostSleptGuard: number = -1;
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

	const mostSleptMinute: [number, number] = [...mostSleptSleepMap].reduce(
		([prevMinute, prevSleep], [currMin, currSleep]): [number, number] => {
			return [prevSleep < currSleep ? currMin : prevMinute, currSleep];
		}
	);

	console.log(`He slept the most at the ${mostSleptMinute[0]} minute mark, for ${mostSleptMinute[1]} times.`);
	return mostSleptGuard * mostSleptMinute[0];
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(2018, 4, 'input.txt'), runner)}`))(); // 106710 ~6ms
}
