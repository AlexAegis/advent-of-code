import { bench, read } from '@lib';
import { cartesianCombinations } from '@lib/math';
import { Vec4 } from '@lib/model';
import { day, year } from '.';
import { parse } from './parse.function';
import { makeCubeStepper } from './part_one';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1868 ~1618.00ms
}
