import { bench, read, split } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import type { Args } from './args.interface.js';

export const hasComponents = (n: number, sequence: number[]): boolean => {
	for (const a of sequence) {
		for (const b of sequence) {
			if (a !== b && a + b === n) {
				return true;
			}
		}
	}
	return false;
};

export const findWithoutComponent = (xmas: number[], preamble = 25): number => {
	const sequence: number[] = [];

	for (const n of xmas) {
		if (sequence.length < preamble) {
			sequence.push(n);
			continue;
		}

		if (!hasComponents(n, sequence.slice(sequence.length - preamble, sequence.length))) {
			return n;
		}
		sequence.push(n);
	}
	return 0;
};

export const runner = (input: string, args?: Args): number => {
	const xmas = split(input).map((line) => parseInt(line, 10));
	const sequence: number[] = [];
	const preamble = args?.preamble ?? 25;
	for (const n of xmas) {
		if (sequence.length < preamble) {
			sequence.push(n);
			continue;
		}

		if (!hasComponents(n, sequence.slice(sequence.length - preamble, sequence.length))) {
			return n;
		}
		sequence.push(n);
	}
	return 0;
};

if (process.env.RUN) {
	const input = await read<Args>(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 217430975 ~2.7ms
}
