import { reader } from '@root/reader.function';
import { bench } from '@root/bench.function';

export const runner = (input: string) => eval(input);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(2018, 1, 'input.txt'), runner)}`))(); // 408 ~0.19ms
}
