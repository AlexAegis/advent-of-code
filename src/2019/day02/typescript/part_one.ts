import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { search } from './search';

export const runner = (input: string) => {
	const arr = parse(input);
	return search(arr, 12, 2, false);
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3101844 ~0.25ms
}
