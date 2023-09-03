export abstract class Element {
	constructor(public tile?: string) {}

	toString(): string {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		return this.tile!;
	}
}
