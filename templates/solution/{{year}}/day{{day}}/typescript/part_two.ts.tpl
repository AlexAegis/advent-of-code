import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = async (input: string) => {
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
