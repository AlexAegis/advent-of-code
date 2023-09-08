/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { nonNullish } from '../../functions/index.js';

export type NestedPairs<T> = [T | NestedPairs<T>, T | NestedPairs<T>];

/**
 * TODO: Finish
 * @param nestedPair
 * @returns
 */
export const isNestedPair = (nestedPair: unknown): nestedPair is NestedPairs<unknown> => {
	return typeof nestedPair === 'object';
};

export type PairSide = 'left' | 'right';

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
export class PairTree<T = number> {
	public parent?: PairTree<T> | undefined;
	public parentSide?: PairSide | undefined;
	public leftTree?: PairTree<T> | undefined;
	public leftValue?: T | undefined;
	public rightTree?: PairTree<T> | undefined;
	public rightValue?: T | undefined;

	constructor(left: T | PairTree<T>, right: T | PairTree<T>) {
		if (left instanceof PairTree) {
			this.leftTree = left;
			this.leftTree.parent = this;
			this.leftTree.parentSide = 'left';
		} else {
			this.leftValue = left;
		}

		if (right instanceof PairTree) {
			this.rightTree = right;
			this.rightTree.parent = this;
			this.rightTree.parentSide = 'right';
		} else {
			this.rightValue = right;
		}
	}

	set left(left: PairTree<T> | T) {
		this.detachSubTree('left');
		if (left instanceof PairTree) {
			this.leftTree = left;
			this.leftTree.parent = this;
			this.leftTree.parentSide = 'left';
			this.leftValue = undefined;
		} else {
			this.leftValue = left;
		}
	}

	get left(): PairTree<T> | T {
		return this.leftTree ?? this.leftValue!;
	}

	set right(right: PairTree<T> | T) {
		this.detachSubTree('right');
		if (right instanceof PairTree) {
			this.rightTree = right;
			this.rightTree.parent = this;
			this.rightTree.parentSide = 'right';
			this.rightValue = undefined;
		} else {
			this.rightValue = right;
		}
	}

	get right(): PairTree<T> | T {
		return this.rightTree ?? this.rightValue!;
	}

	public detachSubTree(side: PairSide): void {
		if (side === 'right' && this.rightTree) {
			this.rightTree.parent = undefined;
			this.rightTree.parentSide = undefined;
			this.rightTree = undefined;
		} else if (side === 'left' && this.leftTree) {
			this.leftTree.parent = undefined;
			this.leftTree.parentSide = undefined;
			this.leftTree = undefined;
		}
	}

	join(other: PairTree<T>): PairTree<T> {
		const parent = this.parent;
		const parentSide = this.parentSide;
		const newNode = new PairTree(this, other);
		if (parent && parentSide) {
			parent.setSide(parentSide, newNode);
		}
		return newNode;
	}

	getSide(side: PairSide): PairTree<T> | T {
		return side === 'left' ? this.left : this.right;
	}

	setSide(side: PairSide, value: PairTree<T> | T) {
		if (side === 'left') {
			this.left = value;
		} else {
			this.right = value;
		}
	}

	findNode(value: T, side?: PairSide): PairTree<T> | undefined {
		for (const node of this.root.leftToRightNodes()) {
			if (side !== 'right' && node.leftValue === value) {
				return node;
			} else if (side !== 'left' && node.rightValue === value) {
				return node;
			}
		}
		return undefined;
	}

	inOrderSuccessor(): PairTree<T> | undefined {
		const iterator = this.root.leftToRightNodes();
		for (let i = iterator.next(); !i.done; i = iterator.next()) {
			if (i.value === this) {
				return iterator.next().value as PairTree<T>;
			}
		}
		return undefined;
	}

	inOrderPredecessor(): PairTree<T> | undefined {
		const iterator = this.root.rightToLeftNodes();
		for (let i = iterator.next(); !i.done; i = iterator.next()) {
			if (i.value === this) {
				return iterator.next().value as PairTree<T>;
			}
		}
		return undefined;
	}

	leftMostTree(): PairTree<T> {
		let next = this as PairTree<T>;
		while (next.leftTree) {
			next = next.leftTree;
		}
		return next;
	}

	rightMostTree(): PairTree<T> {
		let next = this as PairTree<T>;
		while (next.rightTree) {
			next = next.rightTree;
		}
		return next;
	}

	replace(next: PairTree<T> | T): void {
		if (this.parent) {
			if (this.parentSide === 'right') {
				this.parent.right = next;
			} else {
				this.parent.left = next;
			}
		}
	}

	get root(): PairTree<T> {
		let parent = this.parent ?? this;
		while (parent.parent) {
			parent = parent.parent;
		}
		return parent;
	}

	get depth(): number {
		return 1 + (this.parent?.depth ?? 0);
	}

	static fromNestedPairs<T>(nestedPairs: T | NestedPairs<T>): PairTree<T> {
		let left: T | PairTree<T>;
		let right: T | PairTree<T>;
		if (isNestedPair(nestedPairs)) {
			left = isNestedPair(nestedPairs[0])
				? PairTree.fromNestedPairs(nestedPairs[0])
				: nestedPairs[0];

			right = isNestedPair(nestedPairs[1])
				? PairTree.fromNestedPairs(nestedPairs[1])
				: nestedPairs[1];
		} else {
			throw new Error('not a full binary tree source');
		}
		return new PairTree<T>(left, right);
	}

	public *leftToRightNodes(skipEmpty = true): IterableIterator<PairTree<T>> {
		if (this.leftTree) {
			yield* this.leftTree.leftToRightNodes();
		}
		if (nonNullish(this.leftValue) || nonNullish(this.rightValue) || !skipEmpty) {
			yield this;
		}
		if (this.rightTree) {
			yield* this.rightTree.leftToRightNodes();
		}
	}

	public *rightToLeftNodes(skipEmpty = true): IterableIterator<PairTree<T>> {
		if (this.rightTree) {
			yield* this.rightTree.rightToLeftNodes();
		}
		if (nonNullish(this.leftValue) || nonNullish(this.rightValue) || !skipEmpty) {
			yield this;
		}
		if (this.leftTree) {
			yield* this.leftTree.rightToLeftNodes();
		}
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
