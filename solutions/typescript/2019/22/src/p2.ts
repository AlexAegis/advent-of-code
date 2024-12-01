import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const p2 =
	(deckSize = 119_315_717_514_047n, repeat = 101_741_582_076_661n, target = 2020n) =>
	(input: string): number => {
		const lines = parse(input);
		let increment = 1n;
		let offset = 0n;
		for (const line of lines) {
			const nn = Number.parseInt(line.split(' ').pop() ?? '0', 10);
			const bn = Number.isNaN(nn) ? 0n : BigInt(nn);
			if (line.startsWith('deal into new stack')) {
				increment = increment * -1n;
				increment = increment.posMod(deckSize);
				offset = offset + increment;
				offset = offset.posMod(deckSize);
			} else if (line.startsWith('cut')) {
				offset = offset + increment * bn;
				offset = offset.posMod(deckSize);
			} else if (line.startsWith('deal with increment')) {
				increment = increment * bn.invMod(deckSize);
				increment = increment.posMod(deckSize);
			}
		}

		const i = increment.modExp(repeat, deckSize);

		offset = offset * (1n - i) * (1n - increment).posMod(deckSize).invMod(deckSize);
		offset = offset.posMod(deckSize);

		return Number((offset + i * target).posMod(deckSize));
	};

await task(p2(), packageJson.aoc); // 81781678911487 ~1ms
