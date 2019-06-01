import { reader } from './reader.function';
import { bench } from '@root/bench.function';

export const runner = async (input: string) =>
	[...input].filter(c => c === '(' || c === ')').reduce((a, n) => a + (n === '(' ? 1 : -1), 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader, runner)}`))(); // 74 ~0.5ms
}
