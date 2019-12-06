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

	public *find(planet: string): IterableIterator<Planet> {
		if (this.name === planet) {
			yield this;
		}
		for (const orbiter of this.orbiters) {
			yield* orbiter.find(planet);
		}
	}

	public *reach(planet: string): IterableIterator<Planet> {
		if (this.name === planet || !this.find(planet).next().done) {
			yield this;
		}
		for (const orbiter of this.orbiters) {
			yield* orbiter.reach(planet);
		}
	}

	public toString(): string {
		return `${this.name} o: ${this.orbiters.map(o => o.name)}`;
	}
}
