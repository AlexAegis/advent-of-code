import { split, task, type SizedTuple } from '@alexaegis/advent-of-code-lib';
import { crtBigInt, type CongruentModulo } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json';

export const p2 = (input: string): number => {
	const [, data] = split(input) as SizedTuple<string, 2>;

	const mods: CongruentModulo<bigint>[] = data
		.split(',')
		.map((id, i) => ({ id: Number.parseInt(id, 10), i }))
		.filter(({ id }) => !Number.isNaN(id))
		.map(({ id, i }) => ({
			remainder: BigInt(id - i),
			modulo: BigInt(id),
		}));

	return Number(crtBigInt(mods));
};

await task(p2, packageJson.aoc); // 305068317272992 ~0.4ms
