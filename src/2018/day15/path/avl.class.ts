/**
 * AVL Binary Search Tree
 * TODO: T can be number, or a class that implements a Numerical value;
 *
 * @export
 * @class AVL
 */

export namespace AVL {
	export class Tree<K = number, V = number> {
		root: Node<K> = new Node<K>();

		/**
		 * Creates an instance of AVL. From an array, or start empty
		 * @param {...K[]} init
		 * @memberof AVL
		 */
		constructor(...init: K[]) {
			for (let v of init) this.insert(v);
		}

		public insert(...input: K[]) {
			for (let v of input) {
				this.root.insert(v);
				this.root = this.root.rebalance();
			}
		}

		get length(): number {
			let c = 0;
			for (const v of this) c++;
			return c;
		}

		forEach(callback: (i: K) => void): void {
			for (const item of this) callback(item);
		}

		get(key: number): K {
			return;
		}

		*[Symbol.iterator](): IterableIterator<K> {
			yield* this.root;
		}

		*nodes(): IterableIterator<Node<K>> {
			yield* this.root.nodes();
		}

		toArray(): Array<K> {
			const arr: Array<K> = [];
			for (const v of this) arr.push(v);
			return arr;
		}
	}

	export class Node<T> {
		l: Node<T>; // left side
		r: Node<T>; // right side
		v: T; // current value
		h: number;

		constructor(...init: T[]) {
			for (const v of init) this.insert(v);
		}

		/**
		 * Calculates the height of the node. A leafs (node without either a left or a right node) height is
		 *
		 * @readonly
		 * @private
		 * @type {number}
		 * @memberof Node
		 */
		private calch(): void {
			this.h = 1 + Math.max(this.l ? this.l.h : 0, this.r ? this.r.h : 0);
		}

		public insert(v: T) {
			if (!this.v) {
				this.v = v;
			} else if (v < this.v) {
				if (this.l) this.l.insert(v);
				else this.l = new Node<T>(v);
			} else if (v > this.v) {
				if (this.r) this.r.insert(v);
				else this.r = new Node<T>(v);
			} else {
				// throw 'duplicate key';
			}
			this.calch();
		}

		*nodes(): IterableIterator<Node<T>> {
			if (this.l) yield* this.l.nodes();
			yield this;
			if (this.r) yield* this.r.nodes();
		}

		*[Symbol.iterator](): IterableIterator<T> {
			if (this.l) yield* this.l;
			if (this.v) yield this.v;
			if (this.r) yield* this.r;
		}

		toString(): string {
			return `l: ${this.l ? this.l.v : '-'} v: ${this.v} r: ${this.r ? this.r.v : '-'} h: ${this.h}`;
		}

		rebalance(): Node<T> {
			if (this.l) this.l = this.l.rebalance();
			if (this.r) this.r = this.r.rebalance();
			let lh = this.l ? this.l.h : 0;
			let rh = this.r ? this.r.h : 0;
			if (lh > rh + 1) {
				if ((this.l && this.l.l && this.l.l.h) || 0 > (this.l && this.l.r && this.l.r.h) || 0) {
					return this.rrotate();
				} else return this.lrrotate();
			} else if (rh > lh + 1) {
				if ((this.r && this.r.r && this.r.r.h) || 0 > (this.r && this.r.l && this.r.l.h) || 0) {
					return this.lrotate();
				} else return this.rlrotate();
			} else return this;
		}

		private rlrotate() {
			this.r = this.r.rrotate();
			return this.lrotate();
		}

		private lrrotate() {
			this.l = this.l.lrotate();
			return this.rrotate();
		}

		/**
		 * Performs a right rotation on the tree
		 *
		 * @private
		 * @returns {Node<T>} the new root
		 * @memberof AVL
		 */
		private rrotate(): Node<T> {
			const root: Node<T> = this.l;
			this.l = root.r;
			root.r = this;
			this.calch();
			if (this.r) this.r.calch();
			root.calch();
			return root;
		}

		/**
		 * Performs a right rotation on the tree
		 *
		 * @private
		 * @returns {Node<T>} the new root
		 * @memberof AVL
		 */
		private lrotate(): Node<T> {
			const root: Node<T> = this.r;
			this.r = root.l;
			root.l = this;
			this.calch();
			if (this.l) this.l.calch();
			root.calch();
			return root;
		}
	}
}
