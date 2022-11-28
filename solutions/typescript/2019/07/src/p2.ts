import { bench, read } from '@alexaegis/advent-of-code-lib';
import { perm } from '@alexaegis/advent-of-code-lib/functions';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const PHASE = [5, 6, 7, 8, 9];

export const runner = (input: string): number => {
	const a = parse(input);
	const p = perm(PHASE);

	return p.reduce((acc, n) => {
		const ampA = new IntCodeComputer(a);
		ampA.pushInput(n[0]);
		const iterA = ampA.iter();
		const ampB = new IntCodeComputer(a);
		ampB.pushInput(n[1]);
		const iterB = ampB.iter();
		const ampC = new IntCodeComputer(a);
		ampC.pushInput(n[2]);
		const iterC = ampC.iter();
		const ampD = new IntCodeComputer(a);
		ampD.pushInput(n[3]);
		const iterD = ampD.iter();
		const ampE = new IntCodeComputer(a);
		ampE.pushInput(n[4]);
		const iterE = ampE.iter();
		let someHalt = false;
		let prev = 0;
		do {
			ampA.pushInput(prev);
			const resA = iterA.next().value as number;
			ampB.pushInput(resA);
			const resB = iterB.next().value as number;
			ampC.pushInput(resB);
			const resC = iterC.next().value as number;
			ampD.pushInput(resC);
			const resD = iterD.next().value as number;
			ampE.pushInput(resD);
			const resE = iterE.next().value as number;
			someHalt =
				ampA.isHalt() || ampB.isHalt() || ampC.isHalt() || ampD.isHalt() || ampE.isHalt();
			if (resE !== undefined) {
				prev = resE;
			}
		} while (!someHalt);
		return prev > acc ? prev : acc;
	}, 0);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 15432220 ~13.5ms
}
