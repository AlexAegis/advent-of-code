export class MemoryNode {
	private readonly children: MemoryNode[] = [];
	private readonly metadata: number[] = [];
	private childrenRead = 0;
	private metadataRead = 0;

	constructor(private readonly childrenCount: number, private readonly metadataCount: number) {}

	read(tape: number[], cursor: number): number {
		while (this.childrenRead !== this.childrenCount) {
			const child = new MemoryNode(tape[cursor]!, tape[cursor + 1]!);
			this.children.push(child);
			cursor += 2;
			this.childrenRead += 1;
			cursor = child.read(tape, cursor);
		}

		while (this.metadataRead !== this.metadataCount) {
			this.metadata.push(tape[cursor]!);
			cursor += 1;
			this.metadataRead += 1;
		}

		return cursor;
	}

	/**
	 * Part One
	 */
	sum(): number {
		return this.metadata.sum() + this.children.map((child) => child.sum()).sum();
	}

	/**.
	 * Part Two
	 */
	value(): number {
		return this.metadata && this.children.length > 0
			? this.metadata
					.filter((index) => index > 0 && index < this.children.length + 1)
					.map((index) => this.children[--index]!.value())
					.sum()
			: this.sum();
	}
}
