import { reader } from './reader.function';
import { Node } from './node.class';

export const runner = async (input: 'example' | 'input' = 'input'): Promise<any> =>
	new Promise<any>(async res => res(new Node(await reader(input)).sum()));

if (require.main === module) {
	console.time();
	(async () => {
		console.log(`${await runner()}`);
		console.timeEnd();
	})(); // 47112 ~20ms
}
