import { IntCodeComputer } from '@alexaegis/advent-of-code-intcode';
import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json';
import { parse } from './parse.js';

export const execute = (i: IntCodeComputer, print = false): number | undefined => {
	let r: number | undefined;
	let line = '';
	for (const o of i) {
		r = o;
		if (print && o !== undefined) {
			const c = String.fromCodePoint(o);
			if (c === '\n') {
				console.log(line);
				line = '';
			} else {
				line += String.fromCodePoint(o);
			}
		}
	}
	return r;
};

export const p1 =
	(print = false) =>
	(input: string): number | undefined => {
		const i = new IntCodeComputer(parse(input));

		i.pushAsciiInput(
			[
				'OR A J', // J = A
				'AND B J', // J = A AND B
				'AND C J', // J = A AND B AND C
				'NOT J J', // J = !A OR !B OR !C
				'AND D J', // J = (!A OR !B OR !C) AND D
				'WALK',
			].join('\n'),
		);

		return execute(i, print);
	};

await task(p1(), packageJson.aoc); // 19352638 ~23ms
