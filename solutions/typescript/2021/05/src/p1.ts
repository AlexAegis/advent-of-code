import { bench, read } from '@alexaegis/advent-of-code-lib';
import { Vec2, Vec2String } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };

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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 7468 ~35.34ms
}
