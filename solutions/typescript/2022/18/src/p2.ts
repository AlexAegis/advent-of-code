import { split, task, Vec3 } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
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

	const spill = (from: Vec3, alreadyFound = new Set<string>()): Set<string> => {
		alreadyFound.add(from.toString());
		const lastBatch = dirs
			.map((d) => d.add(from))
			.filter((f) => !cm.has(f.toString()) && !alreadyFound.has(f.toString()));

		for (const lb of lastBatch) {
			alreadyFound.add(lb.toString());
		}

		if (alreadyFound.size < 2000 && lastBatch.length > 0) {
			for (const lb of lastBatch) {
				spill(lb, alreadyFound);
			}
		}

		return alreadyFound;
	};

	const fullSurface = lines
		.flatMap((c) => dirs.map((d) => d.add(c)))
		.filter((f) => !cm.has(f.toString()));

	for (const c of fullSurface) {
		if (!cm.has(c.toString())) {
			const a = spill(c);

			if (a.size < 2000) {
				for (const found of a) {
					cm.add(found.toString());
				}
			}
		}
	}

	const outerSurface = lines
		.flatMap((c) => dirs.map((d) => d.add(c)))
		.filter((f) => !cm.has(f.toString()));

	return outerSurface.length;
};

await task(p2, packageJson.aoc); // 0 ~8302.90ms
