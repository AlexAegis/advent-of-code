import { bench, read } from '@root';
import { day, year } from '.';
import { collapse } from './collapse.function';

export const runner = (input: string) => collapse(input).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 9202 ~15ms
}
