import { HuffmannNode } from './huffman-node.class';

export class Huffmann {
	private frequencies = new Map<string, number>();
	private forest: HuffmannNode[] = [];
	public constructor(public input: string[]) {
		for (const fragment of input) {
			this.frequencies.set(fragment, (this.frequencies.get(fragment) ?? 0) + 1);
		}
		for (const [code, frequency] of this.frequencies) {
			this.forest.push(new HuffmannNode(frequency, code));
		}
	}

	public deforest(): HuffmannNode {
		while (this.forest.length > 1) {
			const sortedForest = this.forest.sort((an, bn) => an.frequency - bn.frequency);
			const a = sortedForest.shift();
			const b = sortedForest.shift();
			if (a && b) {
				const n = new HuffmannNode(a.frequency + b.frequency);
				n.left = a;
				n.right = b;
				this.forest = [...sortedForest, n];
			}
		}
		return this.forest[0];
	}
}
