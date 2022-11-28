import { bench, read } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };
import { Network } from './network.class.js';
import type { Packet } from './packet.interface.js';
import { parse } from './parse.js';

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

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 26779 ~38ms
}
