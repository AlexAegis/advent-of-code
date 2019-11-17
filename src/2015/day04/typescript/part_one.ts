import { bench, read } from '@root';
import { day, year } from '.';

export const runner = (input: string): number => {
	return 0;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
