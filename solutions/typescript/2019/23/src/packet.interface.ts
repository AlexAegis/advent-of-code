export interface Packet {
	destination: number;
	x: number;
	y: number;
}

export const nullPacket: Packet = { destination: -1, x: -1, y: -1 };
