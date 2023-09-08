import { LinkedListNode } from './linked-list-node.class.js';

export class CircularLinkedListNode<T> extends LinkedListNode<T> {
	public override prev: CircularLinkedListNode<T>;
	public override next: CircularLinkedListNode<T>;

	public constructor(
		public override value: T,
		prev?: CircularLinkedListNode<T>,
		next?: CircularLinkedListNode<T>,
	) {
		super(value);
		this.prev = prev ?? this;
		this.prev.next = this;
		this.next = next ?? this;
		this.next.prev = this;
	}

	*round(): Generator<T> {
		// eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
		let current: CircularLinkedListNode<T> = this;
		do {
			yield current.value;
			current = current.next;
		} while (current !== this);
	}

	public getInFront(times = 1): CircularLinkedListNode<T> {
		let current = this.next;
		let i = 1;
		while (i < times) {
			i++;

			current = current.next;
		}
		return current;
	}

	public getInBack(times = 1): CircularLinkedListNode<T> {
		let current = this.prev;
		let i = 1;
		while (i < times) {
			i++;
			current = current.prev;
		}
		return current;
	}

	distance(to: CircularLinkedListNode<T>): number {
		let current = this.next;
		let distance = 1;
		while (current !== to) {
			distance++;
			current = current.next;
		}
		return distance;
	}

	eject(): this {
		this.prev.next = this.next;
		this.next.prev = this.prev;
		this.prev = undefined as unknown as CircularLinkedListNode<T>;
		this.next = undefined as unknown as CircularLinkedListNode<T>;
		return this;
	}

	putInFront(node: CircularLinkedListNode<T>) {
		const oldNext = this.next;
		this.next = node;
		node.prev = this;
		node.next = oldNext;
		oldNext.prev = node;
	}

	putBehind(node: CircularLinkedListNode<T>) {
		const oldPrev = this.prev;
		this.prev = node;
		node.next = this;
		node.prev = oldPrev;
		oldPrev.next = node;
	}

	public override *forward(infinite = false): IterableIterator<CircularLinkedListNode<T>> {
		yield this;
		let current = this.next;
		while (current !== (infinite ? undefined : this)) {
			yield current;
			current = current.next;
		}
	}

	public override *backward(infinite = false): IterableIterator<CircularLinkedListNode<T>> {
		yield this;
		let current = this.prev;
		while (current !== (infinite ? undefined : this)) {
			yield current;
			current = current.prev;
		}
	}
}
