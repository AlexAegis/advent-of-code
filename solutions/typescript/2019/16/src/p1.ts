import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const patternGet = (pattern: number[], forNum: number, phase: number): number => {
	return pattern[Math.floor(forNum / (phase + 1) + 1 / (phase + 1)) % pattern.length] ?? 0;
};

export const ftt = (a: number[], messageOffset = 0, multiplier = 1): string | undefined => {
	const pattern = [0, 1, 0, -1];

	const target = 100;
	for (let pn = 0; pn < target; pn++) {
		const p: number[] = [];
		for (let r = 0; r < a.length * multiplier; r++) {
			let s = 0;
			for (let i = 0; i < a.length * multiplier; i += 1) {
				s += ((a[i % a.length] ?? 0) * patternGet(pattern, i, r)) % 10;
			}
			p[r] = Math.abs(s % 10);
		}
		a = p;
	}

	const from = (0 + messageOffset) % a.length;
	let to = (20 + messageOffset) % a.length;
	while (to <= from) {
		to += a.length;
	}
	const q = a.join('').match(/.{1,8}/g);
	return q?.[0];
};

export const p1 = (input: string): string | undefined => ftt(parse(input), 0, 1);

await task(p1, packageJson.aoc); // 30369587 ~1081ms
