import { collapse } from './collapse.function';
import { bench } from '@root/bench.function';
import { reader } from '@root/reader.function';
import { year, day } from '.';

export const runner = (input: string) => collapse(input).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 9202 ~15ms
}
