import { reader } from '@root/reader.function';
import { bench } from '@root/bench.function';
import { day, year } from '.';

export const runner = async (input: string) =>
	[...input].filter(c => c === '(' || c === ')').reduce((a, n) => a + (n === '(' ? 1 : -1), 0);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 74 ~0.5ms
}
