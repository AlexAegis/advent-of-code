import { Key } from 'readline';

/**
 * AVL Search Tree
 *
 * For examples check my mocha tests.
 */
export namespace AVL {
	export interface Convertable<T = number> {
		convertTo(): T;
	}
	export class Tree<V, K extends number | V | Convertable<K> = number> {
		root: Node<V, K> = new Node<V, K>();

		/**
		 * Creates an instance of AVL. From an array, or start empty
		 * @param {...K[]} init
		 * @memberof AVL
		 */
		constructor(private _converter?: (v: V) => K) {}

		set converter(converter: (v: V) => K) {
			this._converter = converter;
		}

		get converter(): (v: V) => K {
			return this._converter;
		}

		/**
		 * The push method tries to convert the value into a number to use it as a Key
		 * if it has a convertTo method (suggested, but not necessarily by the Convertable interface)
		 * it will use that. If not, but you've set a converter
		 *
		 * @param {V} v
		 * @memberof Tree
		 */
		public push(v: V): void {
			let k: K;
			if (typeof v === 'number') {
				k = v as K;
			}
			if (((v as unknown) as Convertable<K>).convertTo) {
				k = (<Convertable<K>>(v as unknown)).convertTo();
			}
			if (!k && this.converter) {
				k = this.converter.bind(v)(v);
			}
			if (k) {
				this.put({ k, v });
			} else
				throw "can't put, no sufficient conversion method. Either use an AVL.Convertable or supply a converter";
		}

		public set(k: K, v: V): void {
			this.root.set(k, v);
			this.root = this.root.rebalance();
			this.root.calch(); // Not really important, just for debugging to see the correct value
		}

		public put(...input: { k: K; v: V }[]) {
			for (let { k, v } of input) {
				this.set(k, v);
			}
		}

		get length(): number {
			let c = 0;
			for (const v of this) c++;
			return c;
		}

		forEach(callback: (i: V) => void): void {
			for (const item of this) callback(item as V);
		}

		get(k: K): V {
			return this.root.search(k);
		}

		*[Symbol.iterator](): IterableIterator<V> {
			yield* this.root;
		}

		*nodes(): IterableIterator<Node<V, K>> {
			yield* this.root.nodes();
		}

		toArray(): Array<V> {
			const arr: Array<V> = [];
			for (const v of this) arr.push(v);
			return arr;
		}
	}

	export class Node<V, K extends number | V | Convertable<K> = number> {
		l: Node<V, K>; // left side
		r: Node<V, K>; // right side
		k: K; // key
		v: V; // value

		h: number;

		constructor(...init: { k: K; v: V }[]) {
			for (const { k, v } of init) this.set(k, v);
		}

		search(k: K | Convertable<K>): V {
			if ((k as Convertable<K>).convertTo) {
				k = (<Convertable<K>>k).convertTo();
			}
			if (this.k && k == this.k) {
				return this.v as V;
			} else if (k < this.k) {
				if (this.l) return this.l.search(k);
				else return undefined;
			} else if (k > this.k) {
				if (this.r) return this.r.search(k);
				else return undefined;
			}
		}

		/**
		 * Calculates the height of the node. A leafs (node without either a left or a right node) height is
		 *
		 * @readonly
		 * @private
		 * @type {number}
		 * @memberof Node
		 */
		calch(): void {
			this.h = 1 + Math.max(this.l ? this.l.h : 0, this.r ? this.r.h : 0);
		}

		set(k: K, v?: V) {
			if ((k as Convertable<K>).convertTo) {
				k = (<Convertable<K>>k).convertTo();
			}

			if ((!this.k && !this.v) || k === this.k) {
				this.k = k;
				this.v = v;
			} else if (k < this.k) {
				if (this.l) this.l.set(k, v);
				else this.l = new Node<V, K>({ k, v });
			} else if (k > this.k) {
				if (this.r) this.r.set(k, v);
				else this.r = new Node<V, K>({ k, v });
			}
			this.calch();
		}

		*nodes(): IterableIterator<Node<V, K>> {
			if (this.l) yield* this.l.nodes();
			yield this;
			if (this.r) yield* this.r.nodes();
		}

		*[Symbol.iterator](): IterableIterator<V> {
			if (this.l) yield* this.l;
			if (this.k) yield this.v;
			if (this.r) yield* this.r;
		}

		toString(): string {
			return `l: ${this.l ? this.l.k : '-'} {k: ${this.k} v: ${this.v}} r: ${this.r ? this.r.k : '-'} h: ${
				this.h
			}`;
		}

		rebalance(): Node<V, K> {
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

		private rlrotate(): Node<V, K> {
			this.r = this.r.rrotate();
			return this.lrotate();
		}

		private lrrotate(): Node<V, K> {
			this.l = this.l.lrotate();
			return this.rrotate();
		}

		/**
		 * Performs a right rotation on the tree
		 *
		 * @private
		 * @returns {Node<K>} the new root
		 * @memberof AVL
		 */
		private rrotate(): Node<V, K> {
			const root: Node<V, K> = this.l;
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
		 * @returns {Node<K>} the new root
		 * @memberof AVL
		 */
		private lrotate(): Node<V, K> {
			const root: Node<V, K> = this.r;
			this.r = root.l;
			root.l = this;
			this.calch();
			if (this.l) this.l.calch();
			root.calch();
			return root;
		}
	}
}
