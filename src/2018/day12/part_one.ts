import { reader } from './reader.function';

export const runner = async (input: string = 'input'): Promise<any> =>
	new Promise<any>(async res => {
		const cave = await reader(input);
		console.log(`cave: ${cave.row} `);
		cave.normalize();
		console.log(`cave: ${cave.row} `);

		cave.rules.forEach(rule => {});

		//for (let i = 0; i < 2; i++) {

		//}

		res(`row: ${cave.row}, rules: ${cave.rules.join('\n')}`);
	});

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`${await runner('example')}`);
		console.timeEnd();
	})();
}
