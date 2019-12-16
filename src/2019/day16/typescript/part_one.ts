import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';

export const patternGet = (pattern: number[], forNum: number, phase: number) => {
	return pattern[Math.floor(forNum / (phase + 1) + 1 / (phase + 1)) % pattern.length];
};

export const ftt = (a: number[], messageOffset: number = 0, multiplier = 1): string => {
	const pattern = [0, 1, 0, -1];

	const target = 100;
	for (let pn = 0; pn < target; pn++) {
		const p: number[] = [];
		for (let r = 0; r < a.length * multiplier; r++) {
			let s = 0;
			for (let i = 0; i < a.length * multiplier; i += 1) {
				s += (a[i % a.length] * patternGet(pattern, i, r)) % 10;
			}
			p[r] = Math.abs(s % 10);
		}
		a = p;

		console.log(p);
	}

	const from = (0 + messageOffset) % a.length;
	let to = (20 + messageOffset) % a.length;
	while (to <= from) {
		to += a.length;
	}
	const q = a.join('').match(/.{1,8}/g);
	return q?.join(' ') ?? '';
	return [...a, ...a].slice(from, to).join('');
};

export const runner = (input: string) => {
	const a = parse(input);

	return ftt(a, 0, 1);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('12345678')}`))();
	// (async () => console.log(`Result: ${await runner('80871224585914546619083218645595')}`))();
	// (async () => console.log(`Result: ${await runner('03036732577212944063491565474664')}`))();
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 30369587 ~0ms
}
