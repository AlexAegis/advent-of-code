export class Packet {
	public constructor(public destination: number, public x: number, public y: number) {}
}

export const nullPacket = new Packet(-1, -1, -1);
