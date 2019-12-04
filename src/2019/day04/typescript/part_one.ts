import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';

export const runner = async (input: string) => {
	const p = parse(input);

	let s = 0;
	for (let i = 0; i < p.length; i++) {
		s += 1;
	}
	console.log(s);
	return s;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
