import { nonNullish } from '@lib/functions';

type LiteralType = 4;
type ContainerType = 0 | 1 | 2 | 3 | 5 | 6 | 7;
type AnyType = LiteralType | ContainerType;

export const isLiteralTypeId = (type: AnyType): type is LiteralType => type === 4;

export const isContainerTypeId = (type: AnyType): type is ContainerType =>
	type !== 4 && type >= 0 && type <= 7;

export interface LiteralPacket {
	version: number;
	type: LiteralType;
	content: number;
}

export interface ContainerPacket {
	version: number;
	type: ContainerType;
	subPackets: Packet[];
}

export type Packet = LiteralPacket | ContainerPacket;

export const isContainerPacket = (packet: Packet): packet is ContainerPacket =>
	nonNullish((packet as ContainerPacket).subPackets);

export const isLiteralPacket = (packet: Packet): packet is LiteralPacket =>
	nonNullish((packet as LiteralPacket).content);

/**
 * Broken into 5 bit segments, each with a prefix '1' except for the last
 * segment, where the prefix is '0'
 */
const interpretLiteralPacketContent = (
	bits: string,
	cursor = 0
): { content: number; nextCursor: number } => {
	let leadingBit = bits[0];
	const content: string[] = [];
	do {
		const prefixedSegment = bits.substring(cursor, (cursor = cursor + 5));
		leadingBit = prefixedSegment[0];
		content.push(prefixedSegment.substring(1));
	} while (leadingBit !== '0');
	return {
		content: parseInt(content.join(''), 2),
		nextCursor: cursor,
	};
};

const interpretPacketHeader = (
	packet: string,
	cursor = 0
): [{ version: number; type: AnyType }, number] => {
	const version = parseInt(packet.substring(cursor, (cursor = cursor + 3)), 2); // Version, bits 0-3
	const type = parseInt(packet.substring(cursor, (cursor = cursor + 3)), 2) as AnyType; // Type, bits 3-6
	return [{ version, type }, cursor];
};

/**
 * lengthTypeId 1: 11 bits of the number of subPackets
 * lengthTypeId 0: 15 bits of the total subpacket length in bits
 */
const interpretLengthCondition = (
	bits: string,
	cursor = 0
): [(cursor: number, subPackets: Packet[]) => boolean, number] => {
	const lengthTypeId = bits.substring(cursor, (cursor = cursor + 1));
	const lengthBitsOffset = lengthTypeId === '1' ? 11 : 15;
	const length = parseInt(bits.substring(cursor, (cursor = cursor + lengthBitsOffset)), 2);
	if (lengthTypeId === '1') {
		return [(_c: number, subPackets: Packet[]) => subPackets.length < length, cursor];
	} else {
		return [(c: number, _subPackets: Packet[]) => c < cursor + length, cursor];
	}
};

const interpretPacketInternal = (bits: string, cursor = 0): [Packet, number] => {
	const [{ version, type }, nextCursor] = interpretPacketHeader(bits, cursor);
	cursor = nextCursor;
	if (isLiteralTypeId(type)) {
		const { content, nextCursor } = interpretLiteralPacketContent(bits, cursor);
		cursor = nextCursor;
		const packet: LiteralPacket = { version, type, content };
		return [packet, cursor];
	} else {
		const packet: ContainerPacket = { version, type, subPackets: [] };
		const [lengthCondition, nextCursor] = interpretLengthCondition(bits, cursor);
		cursor = nextCursor;
		do {
			const [subPacket, cursorEndPosition] = interpretPacketInternal(bits, cursor);
			cursor = cursorEndPosition;
			packet.subPackets.push(subPacket);
		} while (lengthCondition(cursor, packet.subPackets));
		return [packet, cursor];
	}
};

export const interpretPacket = (bits: string): Packet => interpretPacketInternal(bits)[0];
