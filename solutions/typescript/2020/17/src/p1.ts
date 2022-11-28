import { bench, read } from '@alexaegis/advent-of-code-lib';
import { cartesianCombinations } from '@alexaegis/advent-of-code-lib/math';
import type { ToString } from '@alexaegis/advent-of-code-lib/model';
import { Vec3 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.function.js';

const getNeighbours3 = (v: Vec3): Vec3[] => {
	const xs = [v.x - 1, v.x, v.x + 1];
	const ys = [v.y - 1, v.y, v.y + 1];
	const zs = [v.z - 1, v.z, v.z + 1];

	return cartesianCombinations(xs, ys, zs)
		.map(([x, y, z]) => new Vec3(x, y, z))
		.filter((gv) => !gv.equals(v));
};

export const makeCubeStepper =
	<T extends ToString>(vec: (s: string) => T, getNeighbours: (v: T) => T[]) =>
	(cubes: Set<string>): Set<string> => {
		const nextCubes = new Set<string>();
		const bubble = new Set(
			[...cubes.values()].flatMap((v) => getNeighbours(vec(v))).map((v) => v.toString())
		);
		for (const v of bubble) {
			const neighbours = getNeighbours(vec(v));
			const activeNeighbours = neighbours.count((nss) => cubes.has(nss.toString()));
			if (
				(cubes.has(v) && (activeNeighbours === 2 || activeNeighbours === 3)) ||
				(!cubes.has(v) && activeNeighbours === 3)
			) {
				nextCubes.add(v);
			}
		}
		return nextCubes;
	};

export const runner = (input: string): number => {
	let cubes = parse(input, 3);
	const stepCubes = makeCubeStepper((s) => new Vec3(s), getNeighbours3);
	for (let i = 0; i < 6; i++) {
		cubes = stepCubes(cubes);
	}
	return cubes.size;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 304 ~47.52ms
}
