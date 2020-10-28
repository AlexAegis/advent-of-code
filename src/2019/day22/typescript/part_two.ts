import { bench, read } from '@lib';
import bigInt from 'big-integer';
import { day, year } from '.';
import { parse } from './parse';

export const runner = (deckSize = 119315717514047, repeat = 101741582076661, target = 2020) => (
	input: string
): number => {
	const lines = parse(input);

	let increment = bigInt.one;
	let offset = bigInt.zero;

	for (const line of lines) {
		const n: number = parseInt(line.split(' ').pop() as string, 10);
		if (line.startsWith('deal into new stack')) {
			increment = increment.multiply(-1);
			increment = increment.mod(deckSize).add(deckSize).mod(deckSize);
			offset = offset.add(increment);
			offset = offset.mod(deckSize).add(deckSize).mod(deckSize);
		} else if (line.startsWith('cut')) {
			offset = offset.add(increment.multiply(n));
			offset = offset.mod(deckSize).add(deckSize).mod(deckSize);
		} else if (line.startsWith('deal with increment')) {
			increment = increment.multiply(bigInt(n).modInv(deckSize));
			increment = increment.mod(deckSize).add(deckSize).mod(deckSize);
		}
	}

	const i = increment.modPow(repeat, deckSize);

	offset = offset
		.multiply(bigInt.one.minus(i))
		.multiply(
			bigInt.one.minus(increment).mod(deckSize).add(deckSize).mod(deckSize).modInv(deckSize)
		);
	offset = offset.mod(deckSize).add(deckSize).mod(deckSize);

	return offset.add(i.multiply(target)).mod(deckSize).add(deckSize).mod(deckSize).toJSNumber();
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner())}`))(); // 81781678911487 ~1ms
}
