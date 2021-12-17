import { bench, read } from '@lib';
import { Vec2, Vec2String } from '@lib/model';
import { day, year } from '.';

export const parseLine = (line: string): { start: Vec2; end: Vec2 } => {
	const [start, end] = line.split(' -> ').map((coordinate) => new Vec2(coordinate as Vec2String));
	return { start, end };
};

export const runner = (input: string): number => {
	const lines = input
		.lines()
		.map(parseLine)
		.filter(({ start, end }) => start.x === end.x || start.y === end.y);
	const seabed = new Map<Vec2String, number>();
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
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 7468 ~35.34ms
}
