import type { ToString } from '../model/index.js';

export class LinkedListNode<T> implements ToString {
	public prev?: LinkedListNode<T>;
	public next?: LinkedListNode<T>;
	public constructor(public value: T) {}

	public toString(): string {
		return `${String(this.value)}`;
	}

	public *forward(): IterableIterator<LinkedListNode<T>> {
		yield this;
		let current = this.next;
		while (current !== undefined) {
			yield current;
			current = current.next;
		}
	}

	public *backward(): IterableIterator<LinkedListNode<T>> {
		yield this;
		let current = this.prev;
		while (current !== undefined) {
			yield current;
			current = current.prev;
		}
	}

	public first(): LinkedListNode<T> | undefined {
		let result: LinkedListNode<T> | undefined = this.prev;
		while (result?.prev !== undefined) {
			result = result.prev;
		}
		return result;
	}

	public last(): LinkedListNode<T> | undefined {
		let result: LinkedListNode<T> | undefined = this.next;
		while (result?.next !== undefined) {
			result = result.next;
		}
		return result;
	}
}
