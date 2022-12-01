/*
import { bench, read } from '@alexaegis/advent-of-code-lib';
import { bigInverseMod, modn } from '@alexaegis/advent-of-code-lib/math';
import { parse } from '../parse.js';
import packageJson from '../package.json' assert { type: 'json' };

export function expmod(base: bigint, exp: bigint, m: bigint): bigint {
	if (exp === 0n) return 1n;
	if (modn(exp, 2n) === 0n) {
		const a = expmod(base, BigInt(exp / 2n), m);
		return modn(a * a, m);
	} else {
		return modn(base * expmod(base, exp - 1n, m), m);
	}
}

export const p2 = (
	deckSize: bigint = 119315717514047n,
	repeat: bigint = 101741582076661n,
	target: bigint = 2020n
) => (input: string) => {
	const lines = parse(input);

	let increment = 1n;
	let offset = 0n;

	for (const line of lines) {
		const n: number = parseInt(line.split(' ').pop() as string, 10);
		if (line.startsWith('deal into new stack')) {
			increment *= -1n;
			increment = modn(increment, deckSize);
			offset += increment;
			offset = modn(offset, deckSize);
		} else if (line.startsWith('cut')) {
			offset += BigInt(n) * increment;
			offset = modn(offset, deckSize);
		} else if (line.startsWith('deal with increment')) {
			increment *= bigInverseMod(BigInt(n), deckSize);
			increment = modn(increment, deckSize);
		}
	}

	const i = expmod(increment, repeat, deckSize);

	console.log(increment, offset, i);
	offset = offset * (1n - i) * bigInverseMod(modn(1n - increment, deckSize), deckSize);
	console.log(offset); // -185686912732023605851236844276343897437040n

	offset = modn(offset, deckSize);
	console.log(offset); // 113981548092524n

	return modn(offset + target * i, deckSize);
};

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await bench(input, runner())}`); // 81781678911487 ~0.62ms
}

*/
