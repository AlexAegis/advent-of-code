/**
 * Original by [Petka Antonov](https://github.com/petkaantonov/deque/blob/master/js/deque.js)
 * TypeScript refactor by me.
 * TODO: Refactor private methods marked by _ with the private keyword.
 * TODO: Refactor use of `arguments` with rest parameters
 */
/**
 * Copyright (c) 2013 Petka Antonov
 * Copyright (c) 2020 Sándor Győri
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:</p>
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
export class Deque<T> extends Array<T | undefined> {
	constructor(capacity: number = Deque.MAX_CAPACITY, ...arr: T[]) {
		super(...arr);
		this._capacity = Deque.getCapacity(capacity);
		this._length = 0;
		this._front = 0;
		if (Array.isArray(capacity)) {
			const len = capacity.length;
			for (let i = 0; i < len; ++i) {
				this[i] = capacity[i];
			}
			this._length = len;
		}
	}

	get length(): number {
		return this._length;
	}
	static MAX_CAPACITY: number = (1 << 30) | 0;
	static MIN_CAPACITY = 16;

	_capacity: number;
	_length: number;
	_front: number;

	static arrayMove<T>(src: Deque<T>, srcIndex: number, dst: Deque<T>, dstIndex: number, len: number): void {
		for (let j = 0; j < len; ++j) {
			dst[j + dstIndex] = src[j + srcIndex];
			src[j + srcIndex] = undefined;
		}
	}

	static pow2AtLeast(n: number): number {
		n = n >>> 0;
		n = n - 1;
		n = n | (n >> 1);
		n = n | (n >> 2);
		n = n | (n >> 4);
		n = n | (n >> 8);
		n = n | (n >> 16);
		return n + 1;
	}

	static getCapacity(capacity: number): number {
		return Deque.pow2AtLeast(Math.min(Math.max(Deque.MIN_CAPACITY, capacity), Deque.MAX_CAPACITY));
	}

	rotate(n: number): void {
		for (let i = 0; i < Math.abs(n); i++) {
			if (n < 0) {
				this.push(this.shift());
			} else {
				this.unshift(this.pop());
			}
		}
	}

	toArray(): Array<T | undefined> {
		const ret = new Array<T | undefined>(this._length);
		for (let j = 0; j < this._length; ++j) {
			ret[j] = this[(this._front + j) & (this._capacity - 1)];
		}
		return ret;
	}

	push(item: T | undefined): number {
		const argsLength = arguments.length;
		let length = this._length;
		if (argsLength > 1) {
			const capacity = this._capacity;
			if (length + argsLength > capacity) {
				for (let x = 0; x < argsLength; ++x) {
					this._checkCapacity(length + 1);
					const j = (this._front + length) & (this._capacity - 1);
					this[j] = arguments[x];
					length++;
					this._length = length;
				}
				return length;
			} else {
				let j = this._front;
				for (let x = 0; x < argsLength; ++x) {
					this[(j + length) & (capacity - 1)] = arguments[x];
					j++;
				}
				this._length = length + argsLength;
				return length + argsLength;
			}
		}

		if (argsLength === 0) {
			return length;
		}

		this._checkCapacity(length + 1);
		const i = (this._front + length) & (this._capacity - 1);
		this[i] = item;
		this._length = length + 1;
		return length + 1;
	}

	pop(): T | undefined {
		const length = this._length;
		if (length === 0) {
			return undefined;
		}
		const i = (this._front + length - 1) & (this._capacity - 1);
		const ret = this[i];
		this[i] = undefined;
		this._length = length - 1;
		return ret;
	}

	shift(): T | undefined {
		const length = this._length;
		if (length === 0) {
			return undefined;
		}
		const front = this._front;
		const ret = this[front];
		this[front] = undefined;
		this._front = (front + 1) & (this._capacity - 1);
		this._length = length - 1;
		return ret;
	}

	unshift(item: T | undefined): number {
		let length = this._length;
		const argsLength = arguments.length;

		if (argsLength > 1) {
			const c = this._capacity;
			if (length + argsLength > c) {
				for (let x = argsLength - 1; x >= 0; x--) {
					this._checkCapacity(length + 1);
					const j = (((this._front - 1) & (this._capacity - 1)) ^ this._capacity) - this._capacity;
					this[j] = arguments[x];
					length++;
					this._length = length;
					this._front = j;
				}
				return length;
			} else {
				let front = this._front;
				for (let x = argsLength - 1; x >= 0; x--) {
					const j = (((front - 1) & (c - 1)) ^ c) - c;
					this[j] = arguments[x];
					front = j;
				}
				this._front = front;
				this._length = length + argsLength;
				return length + argsLength;
			}
		}

		if (argsLength === 0) {
			return length;
		}

		this._checkCapacity(length + 1);
		const capacity = this._capacity;
		const i = (((this._front - 1) & (capacity - 1)) ^ capacity) - capacity;
		this[i] = item;
		this._length = length + 1;
		this._front = i;
		return length + 1;
	}

	peekBack(): T | undefined {
		const length = this._length;
		if (length === 0) {
			return undefined;
		}
		const index = (this._front + length - 1) & (this._capacity - 1);
		return this[index];
	}

	peekFront(): T | undefined {
		if (this._length === 0) {
			return undefined;
		}
		return this[this._front];
	}

	get(index: number): T | undefined {
		let i = index;
		if (i !== (i | 0)) {
			return undefined;
		}
		const len = this._length;
		if (i < 0) {
			i = i + len;
		}
		if (i < 0 || i >= len) {
			return undefined;
		}
		return this[(this._front + i) & (this._capacity - 1)];
	}

	isEmpty(): boolean {
		return this._length === 0;
	}

	clear(): void {
		const len = this._length;
		const front = this._front;
		const capacity = this._capacity;
		for (let j = 0; j < len; ++j) {
			this[(front + j) & (capacity - 1)] = undefined;
		}
		this._length = 0;
		this._front = 0;
	}

	toString(): string {
		return this.toArray().toString();
	}

	_checkCapacity(size: number): void {
		if (this._capacity < size) {
			this._resizeTo(Deque.getCapacity(this._capacity * 1.5 + 16));
		}
	}

	_resizeTo(capacity: number): void {
		const oldCapacity = this._capacity;
		this._capacity = capacity;
		const front = this._front;
		const length = this._length;
		if (front + length > oldCapacity) {
			const moveItemsCount = (front + length) & (oldCapacity - 1);
			Deque.arrayMove(this, 0, this, oldCapacity, moveItemsCount);
		}
	}
}
