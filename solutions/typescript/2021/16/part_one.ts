import { bench, read } from '@lib';
import { day, year } from '.';
import { hexToBits, interpretPacket, isContainerPacket, Packet } from './model';

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

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 920 ~0.26ms
}
