import { reader } from '@root/reader.function';
import { bench } from '@root/bench.function';
import { year, day } from '.';

export const runner = (input: string) => eval(input);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 408 ~0.19ms
}
