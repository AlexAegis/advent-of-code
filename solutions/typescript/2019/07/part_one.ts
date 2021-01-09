import { bench, read } from '@lib';
import { perm } from '@lib/functions';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const PHASE = [0, 1, 2, 3, 4];

export const runner = (input: string): number => {
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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 929800 ~9.4ms
}
