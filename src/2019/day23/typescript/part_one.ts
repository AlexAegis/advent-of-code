import { bench, read } from '@lib';
import { IntCodeComputer } from '@lib/intcode';
import { day, year } from '.';
import { parse } from './parse';

export const RC = 50;
export const OUTPUT_ADDRESS = 255;
export class Packet {
	public constructor(public destination: number, public x: number, public y: number) {}
}

export const nullPacket = new Packet(-1, -1, -1);

export const runner = (input: string) =>
	new Promise<number>(resolve => {
		const tape = parse(input);
		const network = new Map<number, [IntCodeComputer, IterableIterator<number | undefined>]>();
		const io = new Map<number, Packet[]>();
		let resolved = false;
		// setup
		for (let i = 0; i < RC; i++) {
			const nic = new IntCodeComputer(tape);
			nic.pushInput(i);
			nic.input = (() => {
				let packet: undefined | Packet;
				let readCount = 0;
				return () => {
					if (packet === undefined) {
						packet = io.get(i)?.shift() ?? nullPacket;
						readCount = 0;
					}

					let result: number;
					if (readCount === 0) {
						result = packet.x;
					} else {
						result = packet.y;
						packet = undefined;
					}

					readCount++;
					return result;
				};
			})();

			nic.outputCallback = (() => {
				let packet: undefined | Packet;
				let readCount = 0;
				return (out: number) => {
					if (packet === undefined) {
						packet = new Packet(-1, -1, -1);
						readCount = 0;
					}

					if (readCount === 0) {
						packet.destination = out;
					} else if (readCount === 1) {
						packet.x = out;
					} else {
						packet.y = out;
						if (packet.destination === 255) {
							resolve(out);
							resolved = true;
						} else {
							io.get(packet.destination)?.push(packet);
						}
						packet = undefined;
					}
					readCount++;
					return out;
				};
			})();

			network.set(i, [nic, nic.stepper()]);
			io.set(i, []);
		}

		while (!resolved) {
			for (const [, [, stepper]] of network.entries()) {
				stepper.next();
			}
		}
	});

if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 26779 ~38ms
}
