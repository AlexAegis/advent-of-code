import { bench, read } from '@lib';
import { day, year } from '.';
import { Network } from './network.class';
import { Packet } from './packet.class';
import { parse } from './parse';

export const runner = (input: string): number => {
	const tape = parse(input);
	let result: number | undefined;

	const { network } = new Network(tape, (nat: Packet) => {
		result = nat.y;
	});

	while (!result) {
		for (const [, [, stepper]] of network.entries()) {
			stepper.next();
		}
	}
	return result;
};
// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 26779 ~38ms
}
