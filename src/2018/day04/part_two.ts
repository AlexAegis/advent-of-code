import { createReadStream } from 'fs';
import { createInterface } from 'readline';

interface Event {
	year: number;
	month: number;
	day: number;
	hour: number;
	minute: number;
	guard: number;
	event: string;
}

const interpret = (line: string): Event => {
	let parts = line.split(/\[|-|:|]|#/).map(e => e.trim());
	return {
		year: Number(parts[1]),
		month: Number(parts[2]),
		day: Number(parts[3].split(/ /)[0]),
		hour: Number(parts[3].split(/ /)[1]),
		minute: Number(parts[4]),
		guard: parts[5] === 'Guard' ? Number(parts[6].split(/ /)[0]) : undefined,
		event: parts[5]
	};
};

const read = new Promise<Array<Event>>(res => {
	const events: Array<Event> = [];
	createInterface({
		input: createReadStream('src/2018/day04/input.txt')
	})
		.on('line', (line: string) => events.push(interpret(line)))
		.on('close', () => {
			console.log(`File read.`);
			res(
				events.sort((a, b) => {
					return a.year - b.year !== 0
						? a.year - b.year
						: a.month - b.month !== 0
						? a.month - b.month
						: a.day - b.day !== 0
						? a.day - b.day
						: a.hour - b.hour !== 0
						? a.hour - b.hour
						: a.minute - b.minute !== 0
						? a.minute - b.minute
						: 0;
				})
			);
		});
});

export const runner = (async () => {
	const guards: Map<number, Map<number, number>> = new Map();
	let currentGuard: number; // Guard currently on shift
	let asleepAt: number;
	let o = await read;
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
	console.log(
		`Answer: ${mostSleptGuard *
			mostSleptMinute}, minute: ${mostSleptMinute}, for: ${mostSlept}, guard: ${mostSleptGuard}`
	); // 10491

	return mostSleptGuard * mostSleptMinute;
})();
