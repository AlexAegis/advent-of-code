/**
 * AVL Search Tree
 *
 * For examples check my mocha tests.
 *
 *
 * TODO: deletion
 * // TODO: comparator  using a comparator on values would mean dynamic keying which would mean in worst case O(n / 2) insertion time and no way of acquiring the items only iterating through them in order, for which there are faster methods
 * TODO: comparator for keys.
 * TODO: priority
 * TODO: Tests
 * TODO: Publish to NPM
 */
export namespace AVL {
	export type Options<V, K> = { converter?: (v: V) => K; comparator?: (a: K, b: K) => number };
	export interface Convertable<T = number> {
		convertTo(): T;
	}

	export interface Comparable<T> {
		compareTo(other: T): number;
	}
	/**
	 *
	 *
	 * @export
	 * @class Tree
	 * @template V
	 * @template K by default it's a primitive
	 */
	export class Tree<V, K extends number | string | V | Convertable<K> = number | string> {
		//[string: string]: Node<V, K>;

		root: Node<V, K>;
		// Converts a value to it's key

		private _opts: Options<V, K> = { comparator: (a, b) => (a as number) - (b as number) };

		/**
		 * Creates an instance of AVL. Can set a comparator and/or a converter from here.
		 * Priority as follows:
		 * 1.) opts.comparator
		 *
		 *
		 * @memberof AVL
		 */
		constructor(opts?: Options<V, K>) {
			if (opts) this.opts = opts;
		}

		set opts(opts: Options<V, K>) {
			Object.assign(this._opts, opts);
		}

		get opts(): Options<V, K> {
			return this._opts;
		}

		set converter(converter: (v: V) => K) {
			this._opts.converter = converter;
		}

		get converter(): (v: V) => K {
			return this._opts.converter;
		}

		/**
		 * Compares two values if 'a' is bigger than 'b' it returns a negative value
		 *
		 * Example when using numbers as values: (a: number, b: number) => a - b;
		 *
		 * @memberof Tree
		 */
		set comparator(comparator: (a: K, b: K) => number) {
			this._opts.comparator = comparator;
		}

		get comparator(): (a: K, b: K) => number {
			return this._opts.comparator;
		}

		/**
		 * The push method tries to convert the value into a number to use it as a Key
		 * if it has a convertTo method (suggested, but not necessarily by the Convertable interface)
		 * it will use that. If not, but you've set a converter
		 *
		 * @param {V} v
		 * @memberof Tree
		 */
		public push(...input: V[]): void {
			for (const v of input) {
				//let k: K = v as K;
				let k: K;
				// TODO: BigInt option based on ES level
				if (typeof v === 'number' || typeof v === 'string' /*|| typeof v === 'bigint'*/) {
					k = v as K;
				}
				if (!k && ((v as unknown) as Convertable<K>).convertTo) {
					k = (<Convertable<K>>(v as unknown)).convertTo();
				}
				if (!k && this.converter) {
					k = this.converter.bind(v)(v);
				}
				if (k) {
					this.set(k as K, v);
				} else if (!this.comparator) {
					throw "can't put, no sufficient conversion method. Either use an AVL.Convertable or supply a converter";
				}
			}
		}

		public set(k: K, v: V): void {
			if (!this.root) this.root = new Node<V, K>(this._opts, { k, v });
			else this.root.set(k, v);
			this.root = this.root.rebalance();
			this.root.calch(); // Not really important, just for debugging to see the correct value
		}

		public put(...input: { k: K; v: V }[]) {
			for (let { k, v } of input) {
				this.set(k, v);
			}
		}

		/**
		 * Returns the first element.
		 * Complexity: O(1)
		 */
		min(): V {
			return this.root ? this.root.first().v : undefined;
		}

		/**
		 * Returns the last element.
		 * Complexity: O(1)
		 */
		max(): V {
			return this.root ? this.root.last().v : undefined;
		}

		pop(): V {
			// remove and return max
			return undefined;
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
			if (this.root) return this.root.search(k);
		}

		has(k: K): boolean {
			if (this.root) return !!this.get(k);
		}

		/**
		 * Iterate through the values in ascending order
		 *
		 * @returns {IterableIterator<V>}
		 * @memberof Tree
		 */
		*[Symbol.iterator](): IterableIterator<V> {
			if (this.root) yield* this.root;
		}

		*descend(): IterableIterator<V> {
			if (this.root) yield* this.root.descend();
		}

		/**
		 * For debug purposes
		 *
		 * Complexity:
		 *  call: O(1), iterating through: O(n)
		 *
		 * @returns {IterableIterator<Node<V, K>>}
		 * @memberof Tree
		 */
		/*private*/ *nodes(): IterableIterator<Node<V, K>> {
			if (this.root) yield* this.root.nodes();
		}

		/**
		 * Complexity: O(n)
		 *
		 * @returns {Array<V>}
		 * @memberof Tree
		 */
		toArray(): Array<V> {
			const arr: Array<V> = [];
			for (const v of this) arr.push(v);
			return arr;
		}
	}

	class Node<V, K extends number | string | V | Convertable<K> = number> {
		l: Node<V, K>;
		r: Node<V, K>;
		h: number;
		k: K;
		v: V;
		constructor(private opts: Options<V, K>, ...init: { k: K; v: V }[]) {
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
		 * Returns the first element.
		 * Complexity: O(1)
		 */
		first(): Node<V, K> {
			if (this.l) return this.l.first();
			else this;
		}

		/**
		 * Returns the last element.
		 * Complexity: O(1)
		 */
		last(): Node<V, K> {
			if (this.r) return this.r.last();
			else this;
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
				else this.l = new Node<V, K>(this.opts, { k, v });
			} else if (k > this.k) {
				if (this.r) this.r.set(k, v);
				else this.r = new Node<V, K>(this.opts, { k, v });
			}
			this.calch();
		}

		*[Symbol.iterator](): IterableIterator<V> {
			if (this.l) yield* this.l;
			if (this.k) yield this.v;
			if (this.r) yield* this.r;
		}

		*descend(): IterableIterator<V> {
			if (this.r) yield* this.r;
			if (this.k) yield this.v;
			if (this.l) yield* this.l;
		}

		*nodes(): IterableIterator<Node<V, K>> {
			if (this.l) yield* this.l.nodes();
			yield this;
			if (this.r) yield* this.r.nodes();
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
