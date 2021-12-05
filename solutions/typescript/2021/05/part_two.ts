import { bench, read } from '@lib';
import { Vec2 } from '@lib/model';
import { day, year } from '.';

const parseLine = (line: string): { start: Vec2; end: Vec2 } => {
	const [start, end] = line.split(' -> ').map((coordinate) => new Vec2(coordinate));
	return { start, end };
};

export const runner = (input: string): number => {
	const lines = input.lines().map(parseLine);
	const seabed = new Map<string, number>();
	for (const { start, end } of lines) {
		for (const element of start.reach(end, true, true)) {
			const estr = element.toString();
			const existing = seabed.get(estr) ?? 0;
			seabed.set(estr, existing + 1);
		}
	}
	return [...seabed.values()].count((pipeHeight) => pipeHeight >= 2);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 22364 ~70.72ms
}
