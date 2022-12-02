import { hexToBits } from './model/hex-to-bits.function.js';
import { interpretPacket, isLiteralPacket, Packet } from './model/packet.interface.js';

import { task } from '@alexaegis/advent-of-code-lib';
import packageJson from '../package.json' assert { type: 'json' };

const calculatePacketValue = (packet: Packet): number => {
	if (isLiteralPacket(packet)) {
		return packet.content;
	} else {
		const subPacketValues = packet.subPackets.map((subPacket) =>
			calculatePacketValue(subPacket)
		);
		switch (packet.type) {
			case 0:
				return subPacketValues.sum();
			case 1:
				return subPacketValues.product();
			case 2:
				return subPacketValues.min();
			case 3:
				return subPacketValues.max();
			case 5:
				return subPacketValues[0] > subPacketValues[1] ? 1 : 0;
			case 6:
				return subPacketValues[0] < subPacketValues[1] ? 1 : 0;
			case 7:
				return subPacketValues[0] === subPacketValues[1] ? 1 : 0;
		}
	}
};

export const p2 = (input: string): number => {
	const bits = hexToBits(input.lines()[0]);
	const packet = interpretPacket(bits);
	return calculatePacketValue(packet);
};

await task(p2, packageJson.aoc); // 10185143721112 ~0.26ms
