import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave = await reader(input);
		cave.normalize();
		console.log(`i: 0 cave: ${cave.row} count: ${cave.count()}`);
		let counts = [];
		for (let i = 0; i < 200; i++) {
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
			counts.push(cave.count());
			console.log(
				`i: ${i + 1} cave: ${cave.row} count: ${cave.count()} offset: ${cave.offset} score: ${cave.score()}`
			);
			if (
				counts.length > 5 &&
				counts.slice(counts.length - 5, counts.length).every((next, i, arr) => next === arr[0])
			) {
				console.log(`Stabilized`);
				break;
			}
		}

		res(cave.count());
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 3230 ~
}
