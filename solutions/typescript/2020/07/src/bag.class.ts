export class Bag {
	public canContain = new Map<Bag, number>();

	public static create = (color: string): Bag => new Bag(color);

	public constructor(public color: string) {}

	/**
	 * For Part 1
	 */
	public canEventuallyContain(bag: Bag): boolean {
		return (
			this.canContain.has(bag) ||
			[...this.canContain.keys()].some((b) => b.canEventuallyContain(bag))
		);
	}

	/**
	 * For Part 2
	 */
	public howManyBagsCanItContain(): number {
		return [...this.canContain.entries()].reduce(
			(a, [b, c]) => a + c + c * b.howManyBagsCanItContain(),
			0,
		);
	}
}
