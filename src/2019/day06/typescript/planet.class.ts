export enum Notable {
	CENTER = 'COM',
	YOU = 'YOU',
	SAN = 'SAN'
}

export class Planet implements Iterable<Planet> {
	public orbiters: Planet[] = [];
	public constructor(public name: string) {}

	public *[Symbol.iterator](): IterableIterator<Planet> {
		for (const orbiter of this.orbiters) {
			yield* orbiter;
			yield orbiter;
		}
	}

	public *search(planet: string): IterableIterator<Planet> {
		if (this.name === planet) {
			yield this;
		}
		for (const orbiter of this.orbiters) {
			yield* orbiter.search(planet);
		}
	}

	public *lineOf(planet: string): IterableIterator<Planet> {
		if (this.name === planet || !this.search(planet).next().done) {
			yield this;
		}
		for (const orbiter of this.orbiters) {
			yield* orbiter.lineOf(planet);
		}
	}

	public toString(): string {
		return `${this.name} o: ${this.orbiters.map(o => o.name)}`;
	}
}
