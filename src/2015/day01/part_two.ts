import { reader } from './reader.function';

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
	console.time();
	(async () => {
		console.log(await runner(await reader()));
		console.timeEnd();
	})(); // 1795 ~8ms
}
