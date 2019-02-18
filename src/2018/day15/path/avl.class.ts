import { Convertable } from './convertable.interface';
import { Key } from 'readline';

/**
 * AVL Binary Search Tree
 *
 * Typings
 *
 *
 * @export
 * @class AVL
 */
export namespace AVL {
	export class Tree<K = number | Convertable<number>, V = number | K | Convertable<number>> {
		root: Node<K, V> = new Node<K, V>();

		/**
		 * Creates an instance of AVL. From an array, or start empty
		 * @param {...K[]} init
		 * @memberof AVL
		 */
		constructor(...init: K[]) {
			for (let v of init) this.push(v);
		}

		public push(v: V | number | K | Convertable<K>): void {
			let k: K = <K>v;
			if ((v as Convertable<K>).convertTo) {
				k = (<Convertable<K>>v).convertTo();
			}
			this.put({ k, v });
		}

		public set(k: K, v: V | number | K | Convertable<K>): void {
			this.root.insert(k, v);
			this.root = this.root.rebalance();
			this.root.calch(); // Not really important, just for debugging to see the correct value
		}

		public put(...input: { k: K; v: V | number | K | Convertable<K> }[]) {
			for (let { k, v } of input) {
				this.set(k, v);
			}
		}

		get length(): number {
			let c = 0;
			for (const v of this) c++;
			return c;
		}

		/*forEach(callback: (i: V) => void): void {
			for (const item of this) callback(item);
		}*/

		get(key: number): K {
			return;
		}

		*[Symbol.iterator](): IterableIterator<V | number | K | Convertable<K>> {
			yield* this.root;
		}

		*nodes(): IterableIterator<Node<K, V>> {
			yield* this.root.nodes();
		}

		toArray(): Array<V | number | K | Convertable<K>> {
			const arr: Array<V | number | K | Convertable<K>> = [];
			for (const v of this) arr.push(v);
			return arr;
		}
	}

	export class Node<K = number, V = number | K | Convertable<K>> {
		l: Node<K, V>; // left side
		r: Node<K, V>; // right side
		k: K; // key
		v: V | number | K | Convertable<K>; // value

		h: number;

		constructor(...init: { k: K; v: V | number | K | Convertable<K> }[]) {
			for (const { k, v } of init) this.insert(k, v);
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
		insert(k: K, v?: V | number | K | Convertable<K>) {
			if ((!this.k && !this.v) || k === this.k) {
				this.k = k;
				this.v = v;
			} else if (k < this.k) {
				if (this.l) this.l.insert(k, v);
				else this.l = new Node<K, V>({ k, v });
			} else if (k > this.k) {
				if (this.r) this.r.insert(k, v);
				else this.r = new Node<K, V>({ k, v });
			}
			this.calch();
		}

		*nodes(): IterableIterator<Node<K, V>> {
			if (this.l) yield* this.l.nodes();
			yield this;
			if (this.r) yield* this.r.nodes();
		}

		*[Symbol.iterator](): IterableIterator<V | number | K | Convertable<K>> {
			if (this.l) yield* this.l;
			if (this.k) yield this.v;
			if (this.r) yield* this.r;
		}

		toString(): string {
			return `l: ${this.l ? this.l.k : '-'} {k: ${this.k} v: ${this.v}} r: ${this.r ? this.r.k : '-'} h: ${
				this.h
			}`;
		}

		rebalance(): Node<K, V> {
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

		private rlrotate(): Node<K, V> {
			this.r = this.r.rrotate();
			return this.lrotate();
		}

		private lrrotate(): Node<K, V> {
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
		private rrotate(): Node<K, V> {
			const root: Node<K, V> = this.l;
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
		private lrotate(): Node<K, V> {
			const root: Node<K, V> = this.r;
			this.r = root.l;
			root.l = this;
			this.calch();
			if (this.l) this.l.calch();
			root.calch();
			return root;
		}
	}
}
