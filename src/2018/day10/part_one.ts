import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const vectors = await reader(input);
		//console.log(JSON.stringify(vectors));

		res(0);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner('example')}`);
		console.timeEnd();
	})(); // ~ ms
}
