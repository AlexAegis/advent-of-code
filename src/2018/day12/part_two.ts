import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave = await reader(input);
		cave.normalize();
		// console.log(`i: 0 cave: ${cave.toString()}`);
		let counts = [];
		let scores: Array<number> = [];
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
			scores.push(cave.score());
			// console.log(`i: ${i + 1} cave: ${cave.toString()}`);
			if (
				counts.length > 10 &&
				counts.slice(counts.length - 10, counts.length).every((next, i, arr) => next === arr[0])
			) {
				// console.log(`Stabilized, extrapolating to 50000000000`);
				scores.push(
					scores[scores.length - 1] +
						(scores[scores.length - 1] - scores[scores.length - 2]) * (50000000000 - i - 1)
				);
				break;
			}
		}
		res(scores.pop());
	});

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 4400000000304 ~24ms
}
