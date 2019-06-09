import { bench, read } from '@root';
import { day, year } from '.';

// tslint:disable-next-line: no-eval
export const runner = (input: string) => eval(input);

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 408 ~0.19ms
}
