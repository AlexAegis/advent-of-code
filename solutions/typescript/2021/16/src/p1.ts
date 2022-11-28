import { bench, read } from '@alexaegis/advent-of-code-lib';
import { hexToBits } from './model/hex-to-bits.function.js';
import { interpretPacket, isContainerPacket, Packet } from './model/packet.interface.js';

import packageJson from '../package.json' assert { type: 'json' };

const sumVersions = (packet: Packet): number =>
	packet.version +
	(isContainerPacket(packet)
		? packet.subPackets.map((subPacket) => sumVersions(subPacket)).sum()
		: 0);

export const runner = (input: string): number => {
	const bits = hexToBits(input.lines()[0]);
	const packet = interpretPacket(bits);
	return sumVersions(packet);
};

if (process.env.RUN) {
	const input = await read(packageJson.aoc.year, packageJson.aoc.day);
	console.log(`Result: ${await bench(input, runner)}`); // 920 ~0.26ms
}
