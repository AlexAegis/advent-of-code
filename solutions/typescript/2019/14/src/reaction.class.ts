import { MainResource } from './resource.type.js';

export class Reaction {
	public from = new Map<string, number>();
	public to: string;
	public toq: number;

	public preceeding: Set<[Reaction, number]> = new Set();

	public constructor(input: string, output: string) {
		input
			.split(', ')
			.map((r) => r.splitIntoStringPair(' '))
			.forEach(([q, n]) => this.from.set(n, parseInt(q, 10)));

		const [toq, to] = output.splitIntoStringPair(' ');
		this.toq = parseInt(toq, 10);
		this.to = to;
	}

	public toString(): string {
		return `${[...this.from.entries()].map(([n, q]) => q + ' ' + n).join(', ')} => ${
			this.toq
		} ${this.to}`;
	}

	public oreCost(surplus: Map<string, number>): number {
		let s = this.from.get(MainResource.ORE) ?? 0;
		for (const [pre, totalNeededQuantity] of this.preceeding) {
			const availableQuantity = surplus.get(pre.to) ?? 0;
			const needToCreateQuantity = totalNeededQuantity - availableQuantity;
			const repToSup = repeatToSurpass(pre.toq, needToCreateQuantity);
			const gonnaCreate = repToSup * pre.toq;
			const extra = gonnaCreate - needToCreateQuantity;
			if (extra) {
				surplus.set(pre.to, extra);
			} else {
				surplus.delete(pre.to);
			}

			for (
				let remainingNeededQuantity = needToCreateQuantity;
				remainingNeededQuantity > 0;
				remainingNeededQuantity -= pre.toq
			) {
				s += pre.oreCost(surplus);
			}
		}

		return s;
	}
}

export const repeatToSurpass = (batchSize: number, surpass: number): number => {
	let t = 0;
	let q = 0;
	while (q < surpass) {
		q += batchSize;
		t += 1;
	}
	return t;
};
