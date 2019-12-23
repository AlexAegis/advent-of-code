import { bench, read } from '@lib';
import { day, year } from '.';
import { parse } from './parse';
import { Packet, RC, setupNetwork } from './part_one';

export const runner = (input: string) =>
	new Promise<number>(resolve => {
		const tape = parse(input);
		let resolved = false;
		let nat: Packet | undefined;
		const natLog = new Set<number>();

		const { network, io } = setupNetwork(tape, (n: Packet) => (nat = n));

		while (!resolved) {
			let isIdle = true;
			// TODO: Find a better way to determine idleness
			for (let r = 0; r < RC / 2; r++) {
				isIdle = ![...network.entries()].some(([, [, stepper]]) => stepper.next().value !== undefined);
			}

			if (isIdle && nat) {
				if (natLog.has(nat.y)) {
					resolve(nat.y);
					resolved = true;
				} else {
					natLog.add(nat.y);
				}
				nat.destination = 0;
				io.get(nat.destination)?.push(nat);
			}
		}
	});

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 19216 ~146ms
}
