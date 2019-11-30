import { bench, read } from '@root/lib/typescript';
import { day, year } from '.';
import { interpreter } from './interpeter.function';
import { Node } from './model/node.class';

export const runner = (input: string): number => new Node(interpreter(input)).value();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 28237 ~6ms
}
