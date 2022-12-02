import { task } from '@alexaegis/advent-of-code-lib';
import { perm } from '@alexaegis/advent-of-code-lib/functions';
import { IntCodeComputer } from '@alexaegis/advent-of-code-lib/intcode';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const PHASE = [0, 1, 2, 3, 4];

export const p1 = (input: string): number => {
	const a = parse(input);
	const p = perm(PHASE);

	return p.reduce((acc, n) => {
		const ampA = new IntCodeComputer(a).withInput([n[0], 0]);
		const resA = ampA.execute().pop() as number;

		const ampB = new IntCodeComputer(a).withInput([n[1], resA]);
		const resB = ampB.execute().pop() as number;

		const ampC = new IntCodeComputer(a).withInput([n[2], resB]);
		const resC = ampC.execute().pop() as number;

		const ampD = new IntCodeComputer(a).withInput([n[3], resC]);
		const resD = ampD.execute().pop() as number;

		const ampE = new IntCodeComputer(a).withInput([n[4], resD]);
		const resE = ampE.execute().pop() as number;
		return resE > acc ? resE : acc;
	}, 0);
};

await task(p1, packageJson.aoc); // 929800 ~9.4ms
