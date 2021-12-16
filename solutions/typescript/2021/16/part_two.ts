import { bench, read } from '@lib';
import { day, year } from '.';
import { hexToBits, interpretPacket, isLiteralPacket, Packet } from './model';

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

export const runner = (input: string): number => {
	const bits = hexToBits(input.lines()[0]);
	const packet = interpretPacket(bits);
	return calculatePacketValue(packet);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 10185143721112 ~0.26ms
}
