import { reader } from '@root/reader.function';
import { bench } from '@root/bench.function';

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
	(async () => console.log(`Result: ${await bench(reader(2015, 1, 'input.txt'), runner)}`))(); // 1795 ~0.4ms
}
