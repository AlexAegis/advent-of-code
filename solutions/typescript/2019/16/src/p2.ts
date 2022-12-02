import { task } from '@alexaegis/advent-of-code-lib';
import { lcm } from '@alexaegis/advent-of-code-lib/math';
import packageJson from '../package.json' assert { type: 'json' };
import { parse } from './parse.js';

export const pattern = [0, 1, 0, -1] as const;

export const patternGet = (n: number, p: number): number => {
	return pattern[Math.floor(n / p + 1 / p) % pattern.length];
};

export const phaser = (
	a: number[],
	c = 1,
	f: (a: number[], phase: number) => number[]
): number[] => {
	let p!: number[];
	for (let phase = 0; phase < c; phase++) {
		p = f(p || a, phase);
	}
	return p;
};

export const fft =
	(m = 1) =>
	(a: number[], _phase: number): number[] => {
		const p = [];

		const alen = a.length;
		const plen = pattern.length;
		const prowlen = lcm(alen, m * plen);
		console.log('prowlen', prowlen);

		for (let row = 1; row <= a.length * m; row++) {
			let s = 0;
			for (let col = 0; col < prowlen; col += 1) {
				// In the case of the first number, its just multiplied by the multiplier
				s += (a[col % a.length] * patternGet(col, row)) % 10;
				// idea is to SUM until LCM of (alen and plen * row) prowlen
				// then this can
			}
			s *= m;
			p[row - 1] = Math.abs(s % 10);
		}

		return p;
	};

export const p2 = (input: string): string => {
	const a = parse(input.repeat(1));
	return phaser(a, 1, fft(1)).slice(0, 8).join('');
};

await task(p2, packageJson.aoc, { input: '12345678' }); // 1115317115 ~9.6ms
