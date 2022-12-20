import { split, task, Vec3 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p1 = (input: string): number => {
	const lines = split(input).map((line) => new Vec3(line));

	const cm = new Set<string>();
	for (const v of lines) {
		cm.add(v.toString());
	}

	const dirs = [
		new Vec3(1, 0, 0),
		new Vec3(-1, 0, 0),
		new Vec3(0, 1, 0),
		new Vec3(0, -1, 0),
		new Vec3(0, 0, 1),
		new Vec3(0, 0, -1),
	];

	const r = lines.flatMap((c) => dirs.map((d) => d.add(c))).filter((f) => !cm.has(f.toString()));

	return r.length;
};

await task(p1, packageJson.aoc); // 0 ~0ms
