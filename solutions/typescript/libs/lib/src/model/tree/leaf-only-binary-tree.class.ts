/* eslint-disable @typescript-eslint/no-non-null-assertion */
export const isBinaryTree = <T>(t: T | LeafonlyBinaryTree<T>): t is LeafonlyBinaryTree<T> => {
	return t instanceof LeafonlyBinaryTree;
};

export type NestedPairs<T> = [T | NestedPairs<T>, T | NestedPairs<T>];

export const isNestedPair = (nestedPair: unknown): nestedPair is NestedPairs<unknown> => {
	return typeof nestedPair === 'object';
};

export type BinarySide = 'left' | 'right';

export interface BinaryTreeSide<T> {
	value?: T;
	tree?: LeafonlyBinaryTree<T>;
}

/**
 * Compared to a normal Binary tree where nodes have three values:
 * left?: Node<T>;
 * value: T;
 * right?: Node<T>;
 * This trees nodes doesn't have a value field. Instead each side is either
 * another node or a value. (In the implementation it's split for convenience)
 * left: Node<T> | T;
 * right: Node<T> | T;
 * Because of this reason, it only stores values
 */
export class LeafonlyBinaryTree<T = number> {
	public parent?: LeafonlyBinaryTree<T> | undefined;
	public parentSide?: BinarySide | undefined;
	public leftTree?: LeafonlyBinaryTree<T> | undefined;
	public leftValue?: T | undefined;
	public rightTree?: LeafonlyBinaryTree<T> | undefined;
	public rightValue?: T | undefined;

	constructor(left: T | LeafonlyBinaryTree<T>, right: T | LeafonlyBinaryTree<T>) {
		if (left instanceof LeafonlyBinaryTree) {
			this.leftTree = left;
			this.leftTree.parent = this;
			this.leftTree.parentSide = 'left';
		} else {
			this.leftValue = left;
		}

		if (right instanceof LeafonlyBinaryTree) {
			this.rightTree = right;
			this.rightTree.parent = this;
			this.rightTree.parentSide = 'right';
		} else {
			this.rightValue = right;
		}
	}

	set left(left: LeafonlyBinaryTree<T> | T) {
		if (left instanceof LeafonlyBinaryTree) {
			this.leftTree = left;
			this.leftTree.parent = this;
			this.leftTree.parentSide = 'left';
			this.leftValue = undefined;
		} else {
			this.leftValue = left;
			this.leftTree = undefined;
		}
	}

	get left(): LeafonlyBinaryTree<T> | T {
		return this.leftTree ?? this.leftValue!;
	}

	set right(right: LeafonlyBinaryTree<T> | T) {
		if (right instanceof LeafonlyBinaryTree) {
			this.rightTree = right;
			this.rightTree.parent = this;
			this.rightTree.parentSide = 'right';
			this.rightValue = undefined;
		} else {
			this.rightValue = right;
			this.rightTree = undefined;
		}
	}

	get right(): LeafonlyBinaryTree<T> | T {
		return this.rightTree ?? this.rightValue!;
	}

	getSide(side: BinarySide): LeafonlyBinaryTree<T> | T {
		return side === 'left' ? this.left : this.right;
	}

	setSide(side: BinarySide, value: LeafonlyBinaryTree<T> | T) {
		if (side === 'left') {
			this.left = value;
		} else {
			this.right = value;
		}
	}

	inOrderSuccessor(): LeafonlyBinaryTree<T> | undefined {
		if (this.rightTree) {
			return this.rightTree.leftMostTree();
		} else {
			let node = this as LeafonlyBinaryTree<T>;
			while (node.parent && node.parentSide !== 'left') {
				node = node.parent;
				console.log('inOrderSuccessor ascend', node.toString(), node.parent?.toString());
			}

			if (node.parent?.rightTree) {
				node = node.parent.rightTree;
				console.log('inOrderSuccessor jump', node.toString());
			}

			while (node.leftTree) {
				node = node.leftTree;
				console.log('inOrderSuccessor descend', node.toString());
			}
			return node;
		}
	}

	inOrderPredecessor(): LeafonlyBinaryTree<T> | undefined {
		if (this.leftTree) {
			return this.leftTree.rightMostTree();
		} else {
			let node = this.parent!;
			while (node.parent && node.parentSide !== 'right') {
				node = node.parent;
				console.log('inOrderPredecessor ascend', node.toString(), node.parent?.toString());
			}
			if (node.parent?.leftTree) {
				node = node.parent.leftTree;
				console.log('inOrderPredecessor jump', node.toString());
			}

			while (node.rightTree && node.rightTree !== node) {
				console.log('predescent', node.toString(), node.rightTree.toString());
				node = node.rightTree;
				console.log('inOrderPredecessor descend', node.toString());
			}
			return node;
		}
	}

	inOrderSuccessorBad(): LeafonlyBinaryTree<T> | undefined {
		if (this.rightTree) {
			console.log('asd');
			return this.rightTree.leftMostTree();
		}
		console.log('2asd');

		let node = this as LeafonlyBinaryTree<T>;

		let next = node.parent;
		while (next && node === next.rightTree) {
			node = next;
			next = next.parent;
		}
		return next?.rightTree?.leftMostTree();
	}

	inOrderPredecessorBad(): LeafonlyBinaryTree<T> | undefined {
		if (this.leftTree) {
			return this.leftTree.rightMostTree();
		}

		let node = this as LeafonlyBinaryTree<T>;

		let next = node.parent;
		while (next != undefined && node === next.leftTree) {
			node = next;
			next = next.parent;
		}
		return next?.leftTree?.rightMostTree();
	}

	leftMostTree(): LeafonlyBinaryTree<T> {
		let next = this as LeafonlyBinaryTree<T>;
		while (next.leftTree) {
			next = next.leftTree;
		}
		return next;
	}

	rightMostTree(): LeafonlyBinaryTree<T> {
		let next = this as LeafonlyBinaryTree<T>;
		while (next.rightTree) {
			next = next.rightTree;
		}
		return next;
	}

	replace(next: LeafonlyBinaryTree<T> | T): void {
		if (this.parent) {
			if (this.parentSide === 'right') {
				this.parent.right = next;
			} else {
				this.parent.left = next;
			}
		}
		this.leftValue = 999 as T;
		this.rightValue = 999 as T;
	}

	get root(): LeafonlyBinaryTree<T> {
		let parent = this.parent ?? this;
		while (parent.parent) {
			parent = parent.parent;
		}
		return parent;
	}

	get depth(): number {
		return 1 + (this.parent?.depth ?? 0);
	}

	static fromNestedPairs<T>(nestedPairs: T | NestedPairs<T>): LeafonlyBinaryTree<T> {
		let left: T | LeafonlyBinaryTree<T>;
		let right: T | LeafonlyBinaryTree<T>;
		if (isNestedPair(nestedPairs)) {
			left = isNestedPair(nestedPairs[0])
				? LeafonlyBinaryTree.fromNestedPairs(nestedPairs[0])
				: nestedPairs[0];

			right = isNestedPair(nestedPairs[1])
				? LeafonlyBinaryTree.fromNestedPairs(nestedPairs[1])
				: nestedPairs[1];
		} else {
			throw new Error('not a full binary tree source');
		}
		return new LeafonlyBinaryTree<T>(left, right);
	}

	public *leftToRight(): IterableIterator<T> {
		if (this.leftTree) {
			yield* this.leftTree.leftToRight();
		} else if (this.leftValue) {
			yield this.leftValue;
		}
		if (this.rightTree) {
			yield* this.rightTree.leftToRight();
		} else if (this.rightValue) {
			yield this.rightValue;
		}
	}

	private *rightToLeft(): IterableIterator<T> {
		if (this.rightTree) {
			yield* this.rightTree.rightToLeft();
		} else if (this.rightValue) {
			yield this.rightValue;
		}
		if (this.leftTree) {
			yield* this.leftTree.rightToLeft();
		} else if (this.leftValue) {
			yield this.leftValue;
		}
	}

	toString(): string {
		const leftString = this.leftTree ? this.leftTree.toString() : this.leftValue;
		const rightString = this.rightTree ? this.rightTree.toString() : this.rightValue;
		return `[${String(leftString)},${String(rightString)}]`;
	}

	print(): void {
		console.log(this.toString());
	}
}
