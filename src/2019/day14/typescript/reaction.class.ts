import { sum } from '@lib';
import { MainResource } from './part_one';

export class Reaction {
	public from = new Map<string, number>();
	public to: string;
	public toq: number;

	public preceeding: Set<[Reaction, number]> = new Set();

	public constructor(input: string, output: string) {
		input
			.split(', ')
			.map(r => r.split(' '))
			.forEach(([q, n]) => this.from.set(n, parseInt(q, 10)));

		const [toq, to] = output.split(' ');
		this.toq = parseInt(toq, 10);
		this.to = to;
	}

	public toString(): string {
		return `${[...this.from.entries()].map(([n, q]) => q + ' ' + n).join(', ')} => ${this.toq} ${this.to}`;
	}

	public *cost(): IterableIterator<number> {
		for (const [pre, q] of this.preceeding) {
			for (const _ of Array(q)) {
				yield* pre.cost();
			}

			// if (pre.from.has('ORE')) {
			// yield pre.oreCost();
			// }
		}
	}

	public indirectCost() {
		return [...this.cost()].reduce((s, n) => s + n, 0);
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
