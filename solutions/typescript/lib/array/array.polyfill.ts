import { asc, desc, max, min, mult, sum } from '@lib/math';
import { SizedTuple } from '@lib/model';
import { addAllToSet } from '@lib/set';
import { cutSubSegment } from './cut-subsegment.function';
import { findEndOfPair } from './find-end-of-pair.function';
import { matrixFlipFlop } from './flip-flop.generator';
import { flipMatrix } from './flip-matrix.function';
import { partition } from './partition.function';
import { peek } from './peek.function';
import { rotateMatrix } from './rotate-matrix.function';
import { slideWindow } from './slide-window.function';

declare global {
	interface Array<T> {
		findEndOfPair(pairs: [T, T], from: number): number | undefined;
		cutSubSegment(pairs: [T, T], from: number): T[] | undefined;
		removeItem(item: T): boolean;
		flipMatrix(axis: 'y' | 'x'): T[];
		rotateMatrix(direction: 'r' | 'l'): T[];
		flipFlop(): Generator<T[]>;
		contains(item: T): boolean;
		intoSet(set?: Set<T>): Set<T>;
		has(item: T): boolean;
		toInt(options?: { radix?: number; safe?: boolean }): number[];
		sum(): number;
		product(): number;
		min(): T;
		max(): T;
		asc(): T[];
		desc(): T[];
		clone(): T[];
		count(predicate: (t: T) => boolean): number;
		/**
		 * Returns the last element
		 */
		peek(): T;
		partition(partitioner: (a: T) => boolean): [T[], T[]];
		slideWindow<N extends number>(windowSize?: N): SizedTuple<T, N>[];
		bubbleFindPair(comparator: (a: T, b: T) => boolean): [T, T];
	}
}

Array.prototype.peek = function <T>(): T {
	return peek(this);
};

Array.prototype.count = function <T>(predicate: (t: T) => boolean): number {
	let count = 0;
	for (const element of this) {
		if (predicate(element)) {
			count++;
		}
	}
	return count;
};

Array.prototype.slideWindow = function <T, N extends number>(
	windowSize: N = 2 as N
): SizedTuple<T, N>[] {
	return slideWindow(this, windowSize);
};

Array.prototype.partition = function <T>(partitioner: (a: T) => boolean): [T[], T[]] {
	return partition(this, partitioner);
};

Array.prototype.bubbleFindPair = function <T>(
	comparator: (a: T, b: T) => boolean
): [T | undefined, T | undefined] {
	for (let i = 0; i < this.length - 1; i++) {
		const ei = this[i];
		for (let j = i + 1; j < this.length; j++) {
			const ej = this[j];
			if (comparator(ei, ej)) {
				return [ei, ej];
			}
		}
	}
	return [undefined, undefined];
};

Array.prototype.has = function <T>(item: T): boolean {
	return this.find((i) => i === item) !== undefined;
};

Array.prototype.toInt = function (options?: { radix?: number; safe?: boolean }): number[] {
	let result = this.map((i) => parseInt(i, options?.radix ?? 10));
	if (options?.safe) {
		result = result.filter((i) => !isNaN(i));
	}
	return result;
};

Array.prototype.clone = function <T>(): T[] {
	return Array.from(this);
};

Array.prototype.desc = function <T>(): T[] {
	return this.sort(desc);
};

Array.prototype.asc = function <T>(): T[] {
	return this.sort(asc);
};

Array.prototype.min = function <T>(): T {
	return this.length ? this.reduce(min, Infinity) : undefined;
};

Array.prototype.max = function <T>(): T {
	return this.length ? this.reduce(max, -Infinity) : undefined;
};

Array.prototype.sum = function (): number {
	return this.reduce(sum, 0);
};

Array.prototype.product = function (): number {
	return this.reduce(mult, 1);
};

Array.prototype.intoSet = function <T>(set?: Set<T>): Set<T> {
	return addAllToSet(this, set);
};

Array.prototype.contains = function <T>(item: T): boolean {
	return this.find((i) => i === item) !== undefined;
};

Array.prototype.flipFlop = function* <T>(): Generator<T[][]> {
	yield* matrixFlipFlop(this);
};

Array.prototype.flipMatrix = function <T>(axis: 'y' | 'x' = 'x'): T[][] {
	return flipMatrix(this, axis);
};

Array.prototype.rotateMatrix = function <T>(direction: 'r' | 'l' = 'r'): T[][] {
	return rotateMatrix(this, direction);
};

Array.prototype.findEndOfPair = function <T>(pairs: [T, T], from = 0): number | undefined {
	return findEndOfPair(this, pairs, from);
};

Array.prototype.cutSubSegment = function <T>(pairs: [T, T], from = 0): T[] | undefined {
	return cutSubSegment(this, pairs, from);
};

Array.prototype.removeItem = function <T>(item: T): boolean {
	const index = this.findIndex((e) => e === item);
	if (index >= 0) {
		this.splice(index, 1);
	}
	return index >= 0;
};
