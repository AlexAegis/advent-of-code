import * as fs from 'fs';
import { collapse } from './collapse.function';

export const runner = async (input: 'example' | 'input' = 'input') => {
	return collapse(<string>await fs.promises.readFile(`src/2018/day05/${input}.txt`, { encoding: 'UTF-8' })).length;
};

if (require.main == module) {
	console.time();
	(async () => {
		console.log(`Collapsed sequences length: ${await runner('example')}`);
		console.timeEnd();
	})(); // 10 ~9ms
}
