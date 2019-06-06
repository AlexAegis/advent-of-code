import { bench, reader } from '@root';
import { year, day } from '.';

export const runner = async (input: string) => {
	let a = 0;
	let i = 0;
	for (const c of [...input].filter(c => c === '(' || c === ')')) {
		a += c === '(' ? 1 : -1;
		i++;
		if (a < 0) break;
	}
	return i;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 1795 ~0.4ms
}
