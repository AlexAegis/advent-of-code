import { bench, read } from '@lib';
import { day, year } from '.';
import { compute } from './compute';
import { parse } from './parse';

export const runner = (input: string) => compute(parse(input), 12, 2, false);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 3101844 ~0.25ms
}
