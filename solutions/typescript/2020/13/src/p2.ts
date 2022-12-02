import { split, task } from '@alexaegis/advent-of-code-lib';
import { CongruentModulo, crtBigInt } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };

export const p2 = (input: string): number => {
	const [, data] = split(input);

	const mods: CongruentModulo<bigint>[] = data
		.split(',')
		.map((id, i) => ({ id: parseInt(id, 10), i }))
		.filter(({ id }) => !isNaN(id))
		.map(({ id, i }) => ({
			remainder: BigInt(id - i),
			modulo: BigInt(id),
		}));

	return Number(crtBigInt(mods));
};

await task(p2, packageJson.aoc); // 305068317272992 ~0.4ms
