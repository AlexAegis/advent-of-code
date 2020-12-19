import { bench, read } from '@lib';
import { day, year } from '.';

// tslint:disable-next-line: no-eval
export const runner = (input: string): number => eval(input);

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 408 ~0.19ms
}
