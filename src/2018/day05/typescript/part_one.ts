import { collapse } from './collapse.function';
import { year, day } from '.';
import { bench, reader } from '@root';

export const runner = (input: string) => collapse(input).length;

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 9202 ~15ms
}
