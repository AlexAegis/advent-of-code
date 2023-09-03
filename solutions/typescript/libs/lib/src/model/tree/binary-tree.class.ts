import type { PairSide } from './pair-tree.class.js';

export class BinaryTree<T = number> {
	public parent?: BinaryTree<T> | undefined;
	public parentSide?: PairSide | undefined;
	private _left?: BinaryTree<T> | undefined;
	public value: T;
	private _right?: BinaryTree<T> | undefined;

	constructor(value: T) {
		this.value = value;
	}

	set left(left: BinaryTree<T> | undefined) {
		if (this._left) {
			this._left.parent = undefined;
			this._left.parentSide = undefined;
		}
		this._left = left;
		if (this._left) {
			this._left.parent = this;
			this._left.parentSide = 'left';
		}
	}

	get left(): BinaryTree<T> | undefined {
		return this._left;
	}

	set right(right: BinaryTree<T> | undefined) {
		if (this._right) {
			this._right.parent = undefined;
			this._right.parentSide = undefined;
		}
		this._right = right;
		if (this._right) {
			this._right.parent = this;
			this._right.parentSide = 'right';
		}
	}

	get right(): BinaryTree<T> | undefined {
		return this.right;
	}

	getSide(side: PairSide): BinaryTree<T> | undefined {
		return side === 'left' ? this.left : this.right;
	}

	setSide(side: PairSide, value: BinaryTree<T>) {
		if (side === 'left') {
			this.left = value;
		} else {
			this.right = value;
		}
	}

	get root(): BinaryTree<T> {
		let parent = this.parent ?? this;
		while (parent.parent) {
			parent = parent.parent;
		}
		return parent;
	}

	get depth(): number {
		return 1 + (this.parent?.depth ?? 0);
	}

	public *leftToRight(): IterableIterator<T> {
		if (this.left) {
			yield* this.left.leftToRight();
		}
		yield this.value;
		if (this.right) {
			yield* this.right.leftToRight();
		}
	}

	private *rightToLeft(): IterableIterator<T> {
		if (this.right) {
			yield* this.right.rightToLeft();
		}
		yield this.value;
		if (this.left) {
			yield* this.left.rightToLeft();
		}
	}

	toString(): string {
		return `[${this.left?.toString()},${String(this.value)},${this.right?.toString()}]`;
	}

	print(): void {
		console.log(this.toString());
	}
}
