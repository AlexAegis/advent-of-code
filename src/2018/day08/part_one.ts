import { reader } from './reader.function';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const read = await reader(input);

		res(read);
	});

if (require.main == module) {
	console.log('asd');
	console.time();
	(async () => {
		console.log(`${await runner('example')}`);
		console.timeEnd();
	})(); //  ~ms
}
