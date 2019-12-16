import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { ftt } from './part_one';

export const patternGet = (pattern: number[], forNum: number, phase: number) => {
	return pattern[Math.floor(forNum / (phase + 1) + 1 / (phase + 1)) % pattern.length];
};
export const runner = (input: string) => {
	const a = parse(input.repeat(1));
	const messageOffset = parseInt(a.slice(0, 7).join(''), 10);
	console.log(messageOffset);
	const f = ftt(a, messageOffset);

	return f;
};

if (require.main === module) {
	// (async () => console.log(`Result: ${await runner('12345678')}`))();
	(async () => console.log(`Result: ${await runner('03036732577212944063491565474664')}`))();
	// 	(async () => console.log(`Result: ${await runner('03036732577212944063491565474664')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 30369587 ~0ms
}
