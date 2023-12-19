/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import { perm } from '@alexaegis/advent-of-code-lib/functions';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const PHASE = [0, 1, 2, 3, 4];

export const p1 = (input: string): number => {
	const a = parse(input);
	const p = perm(PHASE);

	return p.reduce((acc, n) => {
		const ampA = new IntCodeComputer(a).withInput([n[0]!, 0]);
		const resA = ampA.execute().pop()!;

		const ampB = new IntCodeComputer(a).withInput([n[1]!, resA]);
		const resB = ampB.execute().pop()!;

		const ampC = new IntCodeComputer(a).withInput([n[2]!, resB]);
		const resC = ampC.execute().pop()!;

		const ampD = new IntCodeComputer(a).withInput([n[3]!, resC]);
		const resD = ampD.execute().pop()!;

		const ampE = new IntCodeComputer(a).withInput([n[4]!, resD]);
		const resE = ampE.execute().pop()!;
		return resE > acc ? resE : acc;
	}, 0);
};

await task(p1, packageJson.aoc); // 929800 ~9.4ms
