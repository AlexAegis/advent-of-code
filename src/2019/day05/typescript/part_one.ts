import { bench, read } from '@lib';
import { day, year } from '.';
import { parseCommaSeparatedNumbers } from './parse';

export const runner = async (input: string) => {
	parseCommaSeparatedNumbers(input);
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
