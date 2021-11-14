import { bench, read } from '@lib';
import { day, year } from '.';
import { interpreter } from './interpeter.function';
import { Node } from './model/node.class';

export const runner = (input: string): number => new Node(interpreter(input)).sum();

// TODO: Reimplement 2018/08, call stack size exceeded
// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 47112 ~6ms
}
