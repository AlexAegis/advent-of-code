import { LinkedListNode } from './linked-list-node.class';

export class CircularLinkedListNode<T> extends LinkedListNode<T> {
	public prev: CircularLinkedListNode<T>;
	public next: CircularLinkedListNode<T>;

	public constructor(
		public value: T,
		prev?: CircularLinkedListNode<T>,
		next?: CircularLinkedListNode<T>
	) {
		super(value);
		this.prev = prev ?? this;
		this.next = next ?? this;
	}

	public *forward(infinite = false): IterableIterator<CircularLinkedListNode<T>> {
		yield this;
		let current = this.next;
		while (current !== (infinite ? undefined : this)) {
			yield current;
			current = current.next;
		}
	}

	public *backward(infinite = false): IterableIterator<CircularLinkedListNode<T>> {
		yield this;
		let current = this.prev;
		while (current !== (infinite ? undefined : this)) {
			yield current;
			current = current.prev;
		}
	}
}
