import { reader } from './reader.function';
import { Cave } from './cave.class';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave: Cave = await reader(input);
		for (let unit of cave.units()) {
			console.log(unit);
		}
		res(cave);
	});
/*
if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner('example.1')}`);
		console.timeEnd();
	})(); //
}*/

console.log(typeof {});

let n = 10;

let asd = () => {
	console.log(this.n);
};
let a = { n: 10 };
asd();
