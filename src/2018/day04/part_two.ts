import { reader } from './reader.function';

export const runner = async (input: 'example' | 'input' = 'input') => {
	const guards: Map<number, Map<number, number>> = new Map();
	let currentGuard: number; // Guard currently on shift
	let asleepAt: number;
	let o = await reader(input);
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
	console.time();
	(async () => {
		console.log(`Result: ${await runner()}`);
		console.timeEnd();
	})(); // 10491 ~16ms
}
