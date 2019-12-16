import { bench, read } from '@lib';
import { day, year } from '.';
import { parseLines } from './parse';

export const runner = async (input: string) => {
	const a = parseLines(input);
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
