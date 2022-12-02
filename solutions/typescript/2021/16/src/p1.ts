import { hexToBits } from './model/hex-to-bits.function.js';
import { interpretPacket, isContainerPacket, Packet } from './model/packet.interface.js';

import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const sumVersions = (packet: Packet): number =>
	packet.version +
	(isContainerPacket(packet)
		? packet.subPackets.map((subPacket) => sumVersions(subPacket)).sum()
		: 0);

export const p1 = (input: string): number => {
	const bits = hexToBits(input.lines()[0]);
	const packet = interpretPacket(bits);
	return sumVersions(packet);
};

await task(p1, packageJson.aoc); // 920 ~0.26ms
