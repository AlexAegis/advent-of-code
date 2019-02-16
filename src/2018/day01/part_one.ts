import { promises } from 'fs';

export const runner = async (input: 'example' | 'input' = 'input') =>
	eval(<string>await promises.readFile(`src/2018/day01/${input}.txt`, { encoding: 'UTF-8' }));

if (require.main === module) {
	console.time();
	(async () => {
		console.log(await runner());
		console.timeEnd();
	})(); // 408 ~9ms
}
