import {
	Direction,
	DirectionCardinalLiteralLetter,
	Vec2,
	task,
} from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

interface DigPlanEntry {
	direction: Direction;
	length: number;
	hex: string;
}

const parse = (input: string): DigPlanEntry[] => {
	return input.lines(false).map<DigPlanEntry>((line) => {
		const [, d, l, hex] = /^([A-Z]) (\d) \((#[\dA-Za-z]*)\)$/.exec(line) ?? [];
		if (!d || !l || !hex) {
			throw new Error('Invalid input data ' + line);
		}
		const direction = Direction.fromMarker(d as DirectionCardinalLiteralLetter);
		return {
			direction,
			hex,
			length: Number.parseInt(l, 10),
		};
	});
};

export const p1 = (input: string): number => {
	const instructions = parse(input);
	console.log(instructions);

	const map = new Map<string, string>();
	const digger = Vec2.ORIGIN.clone();
	map.set(digger.toString(), instructions.first().hex);

	for (const instruction of instructions) {
		for (let i = 1; i <= instruction.length; i++) {
			digger.addMut(instruction.direction);
			map.set(digger.toString(), instruction.hex);
		}
	}
	console.log(map);
	return map.size;
};

await task(p1, packageJson.aoc); // 0 ~0ms
