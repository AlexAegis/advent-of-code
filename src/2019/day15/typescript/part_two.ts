// import { bench, read } from '@lib';
// import { day, year } from '.';

export const runner = (_input: string): number => {
	return 0;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await runner('')}`))();
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 0 ~0ms
}
