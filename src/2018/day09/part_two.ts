import { reader } from './reader.function';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<any> =>
	new Promise<any>(async res => res(await reader(input)));

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // ~ms
}
