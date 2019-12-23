import { bench, read } from '@lib';
import { day, year } from '.';
import { Network, RC } from './network.class';
import { Packet } from './packet.class';
import { parse } from './parse';

export const runner = (input: string) => {
	const tape = parse(input);
	let result: number | undefined;
	let nat: Packet | undefined;
	const natLog = new Set<number>();

	const { network, io } = new Network(tape, (n: Packet) => (nat = n));

	while (!result) {
		let isIdle = true;
		// TODO: Find a better way to determine idleness
		for (let r = 0; r < RC / 2; r++) {
			isIdle = ![...network.entries()].some(([, [, stepper]]) => stepper.next().value !== undefined);
		}

		if (isIdle && nat) {
			if (natLog.has(nat.y)) {
				result = nat.y;
			} else {
				natLog.add(nat.y);
			}
			nat.destination = 0;
			io.get(nat.destination)?.push(nat);
		}
	}
	return result;
};

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 19216 ~146ms
}
