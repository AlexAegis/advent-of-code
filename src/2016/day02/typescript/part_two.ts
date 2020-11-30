import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	console.log(input);
	return 1;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); //
}
