import { benchTask, loadTaskResources, split } from '@alexaegis/advent-of-code-lib';
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

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p2, resources)}`); // 305068317272992 ~0.4ms
}
