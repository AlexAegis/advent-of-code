import { frequencyMap } from '../../functions/frequency-map.function.js';
import { HuffmannNode } from './huffman-node.class.js';

export class Huffmann {
	private frequencies: Map<string, number>;
	private forest: HuffmannNode[] = [];
	public constructor(public input: string[]) {
		this.frequencies = frequencyMap(input);
		for (const [code, frequency] of this.frequencies) {
			this.forest.push(new HuffmannNode(frequency, code));
		}
	}

	public deforest(): HuffmannNode | undefined {
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
