import { bench, read } from '@lib';
import { day, year } from '.';

export const runner = (input: string): number => {
	let a = 0;
	let i = 0;
	for (const char of [...input].filter((c) => c === '(' || c === ')')) {
		a += char === '(' ? 1 : -1;
		i++;
		if (a < 0) break;
	}
	return i;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 1795 ~1.2ms
}
