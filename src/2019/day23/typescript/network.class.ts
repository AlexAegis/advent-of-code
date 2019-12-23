import { IntCodeComputer } from '@lib/intcode';
import { nullPacket, Packet } from './packet.class';
export const RC = 50;
export const OUTPUT_ADDRESS = 255;

export class Network {
	public network = new Map<number, [IntCodeComputer, IterableIterator<number | undefined>]>();
	public io = new Map<number, Packet[]>();

	public constructor(tape: number[], nat: (nat: Packet) => void) {
		for (let i = 0; i < RC; i++) {
			const nic = new IntCodeComputer(tape);
			nic.pushInput(i);
			nic.input = (() => {
				let packet: undefined | Packet;
				let readCount = 0;
				return () => {
					if (packet === undefined) {
						packet = this.io.get(i)?.shift() ?? nullPacket;
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
							nat(packet);
						} else {
							this.io.get(packet.destination)?.push(packet);
						}
						packet = undefined;
					}
					readCount++;
					return out;
				};
			})();

			this.network.set(i, [nic, nic.stepper()]);
			this.io.set(i, []);
		}
	}
}
