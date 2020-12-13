import { bench, read, split } from '@lib';
import { CongruentModulo, crtBigInt } from '@lib/math';
import { day, year } from '.';

export const runner = (input: string): number => {
	const [, data] = split(input);

	const mods: CongruentModulo<bigint>[] = data
		.split(',')
		.map((id, i) => ({ id: parseInt(id, 10), i }))
		.filter(({ id }) => !isNaN(id))
		.map(({ id, i }) => ({ remainder: BigInt(id - i), modulo: BigInt(id) }));

	return Number(crtBigInt(mods));
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 305068317272992 ~0.4ms
}
