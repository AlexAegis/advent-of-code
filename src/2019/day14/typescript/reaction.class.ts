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

	public oreCost(surplus: Map<string, number>, level = 0): number {
		let s = this.from.get(MainResource.ORE) ?? 0;
		console.log('\t'.repeat(level), 'COST OF', this.toq, this.to, '(DIRECT ORE COST ', s, ')');
		for (const [pre, totalNeededQuantity] of this.preceeding) {
			const availableQuantity = surplus.get(pre.to) ?? 0; // 7
			const needToCreateQuantity = totalNeededQuantity - availableQuantity;
			const repToSup = repeatToSurpass(pre.toq, needToCreateQuantity);

			const gonnaCreate = repToSup * pre.toq;

			const extra = gonnaCreate - needToCreateQuantity;
			surplus.set(pre.to, extra);
			console.log(
				'\t'.repeat(level),
				'Creating',
				pre.to,
				'have to crate total',
				totalNeededQuantity,
				'available',
				availableQuantity,
				'needToCreateQuantity',
				needToCreateQuantity,
				'repToSup',
				repToSup,
				'gonnaCreate',
				gonnaCreate,
				' extra will be created:',
				extra,
				'SURPO [',
				[...surplus.entries()].map(([k, v]) => k + ': ' + v.toString()).join('; '),
				']'
			);

			for (
				let remainingNeededQuantity = needToCreateQuantity;
				remainingNeededQuantity > 0;
				remainingNeededQuantity -= pre.toq
			) {
				console.log(
					'\t'.repeat(level),
					'Creating',
					pre.to,
					'by batches of',
					pre.toq,
					'have to crate',
					remainingNeededQuantity
				);
				// PAL 2, 5

				// const diffInQuantity = remainingNeededQuantity - availableQuantity; // -2
				// const neededQuantity = Math.max(diffInQuantity, 0); // 0
				// const usingFromSurplusQuantity = Math.abs(Math.min(diffInQuantity, 0)); // 2
				//
				// const haveToRepeat = repeatToSurpass(pre.toq, neededQuantity); // 0
				// const toBeCreated = haveToRepeat * pre.toq; // 0
				// const extra = toBeCreated - neededQuantity; // 0
				const oreCost = pre.oreCost(surplus, level + 1) /** haveToRepeat*/;
				s += oreCost;
				// 	surplus.set(pre.to, usingFromSurplusQuantity + extra);

				// console.log(
				// 	'\t'.repeat(level),
				// 	'Already have',
				// 	availableQuantity,
				// 	'need to make: ',
				// 	neededQuantity,
				// 	'using from already available:',
				// 	usingFromSurplusQuantity,
				// 	'for this I have to make',
				// 	haveToRepeat,
				// 	'more batches.',
				// 	'Im gonna create',
				// 	toBeCreated,
				// 	'more.',
				// 	'that means an extra of',
				// 	extra,
				// 	'. and this is going to cost',
				// 	oreCost,
				// 	'SURP',
				// 	[...surplus.entries()].map(([k, v]) => k + ':' + v.toString()).join('; ')
				// );
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
