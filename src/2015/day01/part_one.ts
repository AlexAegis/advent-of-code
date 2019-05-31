import { reader } from './reader.function';

export const runner = async (input: string) =>
	[...input].filter(c => c === '(' || c === ')').reduce((a, n) => a + (n === '(' ? 1 : -1), 0);

if (require.main === module) {
	console.time();
	(async () => {
		console.log(await runner(await reader()));
		console.timeEnd();
	})(); // 74 ~8ms
}
