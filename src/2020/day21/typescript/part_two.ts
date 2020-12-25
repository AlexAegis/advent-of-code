import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse.function';

export const runner = (input: string): number => {
	const entries = parse(input);
	console.log(entries);
	return 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
