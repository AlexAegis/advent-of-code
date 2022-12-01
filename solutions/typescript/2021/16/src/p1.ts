import { hexToBits } from './model/hex-to-bits.function.js';
import { interpretPacket, isContainerPacket, Packet } from './model/packet.interface.js';

import { benchTask, loadTaskResources } from '@alexaegis/advent-of-code-lib';
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

if (process.env.RUN) {
	const resources = await loadTaskResources(packageJson.aoc);
	console.log(`Result: ${await benchTask(p1, resources)}`); // 920 ~0.26ms
}
