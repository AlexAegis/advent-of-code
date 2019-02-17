export class Element {
	constructor(public tile?: string) {}

	toString(): string {
		return this.tile;
	}
}
