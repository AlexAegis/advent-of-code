import { bench, read } from '@lib';
import { day, year } from '.';
import { collapse } from './collapse.function';

export const runner = (input: string): number => collapse(input).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 9202 ~15ms
}
