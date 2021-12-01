import { bench, read } from '@lib';
import { cartesianCombinations } from '@lib/math';
import { Vec3 } from '@lib/model';
import { ToString } from '@lib/model/to-string.interface';
import { day, year } from '.';
import { parse } from './parse.function';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 304 ~47.52ms
}
