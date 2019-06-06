import { Node } from './model/node.class';
import { bench, reader } from '@root';
import { year, day } from '.';
import { interpreter } from './interpeter.function';

export const runner = (input: string): number => new Node(interpreter(input)).sum();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 47112 ~6.7ms
}
