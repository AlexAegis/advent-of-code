import { interpreter } from './interpeter.function';
import { Node } from './model/node.class';
import { bench, reader } from '@root';
import { year, day } from '.';

export const runner = (input: string): any => new Node(interpreter(input)).value();

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(reader(year, day), runner)}`))(); // 28237 ~6.6ms
}
