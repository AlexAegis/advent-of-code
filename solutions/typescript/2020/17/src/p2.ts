import { bench, read } from '@alexaegis/advent-of-code-lib';
import { cartesianCombinations } from '@alexaegis/advent-of-code-lib/math';
import { Vec4 } from '@alexaegis/advent-of-code-lib/model';
import packageJson from '../package.json' assert { type: 'json' };
import { makeCubeStepper } from './p1.js';
import { parse } from './parse.function.js';

const getNeighbours4 = (v: Vec4): Vec4[] => {
	const xs = [v.x - 1, v.x, v.x + 1];
	const ys = [v.y - 1, v.y, v.y + 1];
	const zs = [v.z - 1, v.z, v.z + 1];
	const ws = [v.w - 1, v.w, v.w + 1];
	return cartesianCombinations(xs, ys, zs, ws)
		.map(([x, y, z, w]) => new Vec4(x, y, z, w))
		.filter((gv) => !gv.equals(v));
};

export const runner = (input: string): number => {
	let cubes = parse(input, 4);
	const stepCubes = makeCubeStepper((s) => new Vec4(s), getNeighbours4);
	for (let i = 0; i < 6; i++) {
		cubes = stepCubes(cubes);
	}
	return cubes.size;
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 1868 ~1618.00ms
}
