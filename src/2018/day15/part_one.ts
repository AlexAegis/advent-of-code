import { Cave } from './cave.class';
import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave: Cave = await reader(input);
		for (const unit of cave.units()) {
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
/*
console.log(typeof {});

const n = 10;

const asd = () => {
	console.log(this.n);
};
const a = { n: 10 };
asd();
*/
