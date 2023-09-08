export class HuffmannNode {
	public left?: HuffmannNode;
	public right?: HuffmannNode;

	public constructor(
		public frequency: number,

		public code?: string,
	) {}

	public toString(prefix = ''): string {
		let s = `${prefix}${this.code ?? '('}:${this.frequency}\n`;
		if (this.left) {
			s += this.left.toString(prefix + '\t');
		}
		if (this.right) {
			s += this.right.toString(prefix + '\t');
		}
		return s;
	}

	public *codeTable(prefix = ''): IterableIterator<[string, string]> {
		if (this.left) {
			yield* this.left.codeTable(prefix + '1');
		}
		if (this.code) {
			yield [this.code, prefix];
		}
		if (this.right) {
			yield* this.right.codeTable(prefix + '0');
		}
	}
}
