export class Node {
	public constructor(input: number[], private parent?: Node) {
		if (this.parent) {
			this.parent.children.push(this);
		}
		this.identifier = String.fromCharCode(++Node.currCharIndex);
		this.level = this.parent ? this.parent.level + 1 : 0;
		this.totalNumberOfChildren = input.shift();
		this.totalNumberOfData = input.shift();
		this.process(input);
	}

	public static currCharIndex = 96;
	public identifier: string;
	public level: number;
	public data: number[] | undefined;
	public children: Node[] = [];
	public processedChildren = 0;
	public totalNumberOfChildren: number | undefined;
	public totalNumberOfData: number | undefined;

	public process(input: number[]): Node | undefined {
		if (this.totalNumberOfChildren === this.processedChildren) {
			this.data = input.splice(0, this.totalNumberOfData);
			if (this.parent) {
				this.parent.processedChildren++;
				this.parent.process(input);
			}
			return undefined;
		} else return new Node(input, this);
	}

	// part one
	public sum(): number {
		return this.children
			.map(child => child.sum())
			.concat(this.data ? this.data : [])
			.reduce((acc, next) => acc + next);
	}

	// part two
	public value(): number {
		return this.data && this.children.length > 0
			? this.data
					.filter(index => index > 0 && index < this.children.length + 1)
					.map(index => this.children[--index].value())
					.reduce((acc, next) => acc + next, 0)
			: this.sum();
	}

	public toString(): string {
		return `[${this.data} - ${this.children.map(child => child.toString()).reduce((acc, next) => acc + next, '')}]`;
	}
}
