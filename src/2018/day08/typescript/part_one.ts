import { bench, read } from '@root';
import { day, year } from '.';
import { interpreter } from './interpeter.function';
import { Node } from './model/node.class';

export const runner = (input: string): number => new Node(interpreter(input)).sum();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 47112 ~6.7ms
}
