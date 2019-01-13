export class Node {
	identifier: string;
	level: number;
	parent: Node;
	data: Array<number>;
	children: Array<Node> = [];
	processedChildren: number = 0;
	totalNumberOfChildren: number;
	totalNumberOfData: number;

	static currCharIndex: number = 96;

	constructor(input: Array<number>, parent?: Node) {
		this.parent = parent;
		if (this.parent) this.parent.children.push(this);
		this.identifier = String.fromCharCode(++Node.currCharIndex);
		this.level = this.parent ? this.parent.level + 1 : 0;
		this.totalNumberOfChildren = input.shift();
		this.totalNumberOfData = input.shift();
		this.process(input);
	}

	process(input: Array<number>) {
		if (this.totalNumberOfChildren === this.processedChildren) {
			this.data = input.splice(0, this.totalNumberOfData);
			if (this.parent) {
				this.parent.processedChildren++;
				this.parent.process(input);
			}
		} else new Node(input, this);
	}

	// part one
	sum(): number {
		return this.children
			.map(child => child.sum())
			.concat(this.data)
			.reduce((acc, next) => acc + next);
	}

	// part two
	value(): number {
		return this.children.length > 0
			? this.data
					.filter(index => index > 0 && index < this.children.length + 1)
					.map(index => this.children[--index].value())
					.reduce((acc, next) => acc + next, 0)
			: this.sum();
	}

	toString(): string {
		return `[${this.data} - ${this.children.map(child => child.toString()).reduce((acc, next) => acc + next, '')}]`;
	}
}
