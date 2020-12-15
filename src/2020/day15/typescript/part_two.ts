import { bench, read } from '@lib';
import { day, year } from '.';
import { calculate } from './part_one';

export const runner = calculate(30000000);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 201 ~4932.26ms
}
