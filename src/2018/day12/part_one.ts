import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave = await reader(input);
		cave.normalize();
		// console.log(`i: 0 cave: ${cave.toString()}`);
		for (let i = 0; i < 20; i++) {
			let nextGen = '..';
			for (let p = 2; p < cave.row.length - 2; p++) {
				let char = cave.row.charAt(p);
				if (cave.rules.indexOf(cave.row.substr(p - 2, 5)) >= 0) {
					nextGen += char === '.' ? '#' : '.';
				} else {
					nextGen += char;
				}
			}
			cave.row = nextGen;
			cave.normalize();
			// console.log(`i: ${i + 1} cave: ${cave.toString()}`);
		}

		res(cave.score());
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 3230 ~10ms
}
