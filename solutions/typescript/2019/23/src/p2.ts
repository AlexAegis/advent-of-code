import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Network, NETWORK_SIZE } from './network.class.js';
import type { Packet } from './packet.interface.js';
import { parse } from './parse.js';

export const p2 = (input: string): number => {
	const tape = parse(input);
	let result: number | undefined;
	let nat: Packet | undefined;
	const natLog = new Set<number>();

	const { network, io } = new Network(tape, (n: Packet) => (nat = n));

	while (!result) {
		let isIdle = true;
		// TODO: Find a better way to determine idleness
		for (let r = 0; r < NETWORK_SIZE / 2; r++) {
			isIdle = ![...network.entries()].some(
				([, [, stepper]]) => stepper.next().value !== undefined
			);
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

await task(p2, packageJson.aoc); // 19216 ~146ms
