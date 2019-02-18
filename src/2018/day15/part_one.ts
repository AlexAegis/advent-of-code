import { reader } from './reader.function';
import { Cave } from './cave.class';
import * as pf from 'ngraph.path';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave: Cave = await reader(input);
		for (let unit of cave.units()) {
			console.log(unit);
			pf.nba([], {});
		}
		res(cave);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner('example.1')}`);
		console.timeEnd();
	})(); //
}
