import { Vertice } from './block/vertice.class';

export abstract class Element {
	constructor(public tile?: string) {}

	toString(): string {
		return this.tile;
	}
}
