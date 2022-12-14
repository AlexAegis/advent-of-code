import { isNumberArray } from '../functions/index.js';
import { asc, desc, mult, sum } from '../math/index.js';
import type { SizedTuple } from '../model/index.js';
import { addAllToSet } from '../set/index.js';
import { cutSubSegment } from './cut-subsegment.function.js';
import { filterMap } from './filter-map.function.js';
import { findEndOfPair } from './find-end-of-pair.function.js';
import { matrixFlipFlop } from './flip-flop.generator.js';
import { flipMatrix } from './flip-matrix.function.js';
import { getSizedGroups } from './get-sized-groups.function.js';
import { groupByDelimiter } from './group-by-delimiter.function.js';
import { pairwise, slideWindow } from './groups/index.js';
import { maxOf } from './max-of.function.js';
import { mean } from './mean.function.js';
import { median } from './median.function.js';
import { minOf } from './min-of.function.js';
import { pairsWith } from './pairs-with.function.js';
import { partition } from './partition.function.js';
import { peek } from './peek.function.js';
import { rotateMatrix } from './rotate-matrix.function.js';

declare global {
	interface Array<T> {
		first(): T;
		last(): T;
		findEndOfPair(pairs: [T, T], from: number): number | undefined;
		cutSubSegment(pairs: [T, T], from: number): T[] | undefined;
		removeItem(item: T): boolean;
		flipMatrix(axis: 'y' | 'x'): T[];
		rotateMatrix(direction: 'r' | 'l'): T[];
		flipFlop(): Generator<T[]>;
		contains(item: T): boolean;
		intoSet(set?: Set<T>): Set<T>;
		has(item: T): boolean;
		tap(callbackFn: (item: T) => void): T[];
		toInt(options?: { radix?: number; safe?: boolean; keepNonNumbers: false }): number[];
		toInt(options?: {
			radix?: number;
			safe?: boolean;
			keepNonNumbers: true;
		}): (number | undefined)[];
		toInt(options?: { radix?: number; safe?: boolean; keepNonNumbers?: boolean }): number[];
		intoIter(): IterableIterator<T>;
		repeat(until?: (element: T, iteration: number) => boolean): IterableIterator<T>;
		sum(): number;
		product(): number;
		min(): number;
		min(count: number): number[];
		min(count?: number): number | number[];
		max(): number;
		max(count: number): number[];
		max(count?: number): number | number[];
		asc(): T[];
		desc(): T[];
		clone(): T[];
		count(predicate: (t: T) => boolean): number;
		/**
		 * Returns the last element
		 */
		peek(): T;
		/**
		 * Return the middle element
		 */
		median(): number;
		/**
		 * Return the average value of the array
		 */
		mean(): number;
		filterMap<V>(mapFn: (t: T) => V | undefined): V[];
		partition(partitioner: (a: T) => boolean): [T[], T[]];
		pairwise(callback: (a: T, b: T) => void): void;
		slideWindow<N extends number>(windowSize?: N): SizedTuple<T, N>[];
		bubbleFindPair(comparator: (a: T, b: T) => boolean): [T, T];
		unique(comparator?: (a: T, b: T) => boolean): T[];
		pairsWith<N = T>(other?: N[], onlyUnique?: boolean): [T, N][];
		getSizedGroups(groupSize: number): T[][];
		/**
		 *
		 * @param isDelimiter by default it checks if a value is falsy or not
		 */
		groupByDelimiter(isDelimiter?: (t: T) => boolean): T[][];
	}
}

Array.prototype.groupByDelimiter = function <T>(isDelimiter?: (t: T) => boolean): T[][] {
	return groupByDelimiter(this, isDelimiter);
};

Array.prototype.getSizedGroups = function <T>(groupSize: number): T[][] {
	return getSizedGroups(this, groupSize);
};

Array.prototype.intoIter = function* <T>(): IterableIterator<T> {
	for (const element of this) {
		yield element;
	}
};

Array.prototype.repeat = function* <T>(
	until: (element: T, iteration: number) => boolean
): IterableIterator<T> {
	for (let i = 0; ; i++) {
		for (const element of this) {
			yield element;
			if (until?.(element, i)) {
				return;
			}
		}
	}
};

Array.prototype.pairsWith = function <T, N = T>(other?: N[], onlyUnique = false): [T, N][] {
	return pairsWith(this, other, onlyUnique);
};

Array.prototype.first = function <T>(): T {
	return this[0];
};

Array.prototype.last = function <T>(): T {
	return this[this.length - 1];
};

Array.prototype.unique = function <T>(comparator?: (a: T, b: T) => boolean): T[] {
	const result: T[] = [];
	for (const item of this) {
		if (!result.some((r) => (comparator ? comparator(r, item) : r === item))) {
			result.push(item);
		}
	}
	return result;
};

Array.prototype.filterMap = function <T, V>(mapFn: (t: T) => V | undefined): V[] {
	return filterMap(this, mapFn);
};

Array.prototype.tap = function <T>(callbackFn: (item: T) => void): T[] {
	for (const item of this) {
		callbackFn(item);
	}
	return this;
};

Array.prototype.mean = function (): number {
	if (!isNumberArray(this)) {
		throw new Error('Mean can only be calculated for number[]');
	}
	return mean(this);
};

Array.prototype.median = function (): number {
	if (!isNumberArray(this)) {
		throw new Error('Median can only be calculated for number[]');
	}
	return median(this);
};

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

Array.prototype.pairwise = function <T>(callback: (a: T, b: T) => void): void {
	return pairwise(this, callback);
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

Array.prototype.toInt = function (options?: {
	radix?: number;
	safe?: boolean;
	keepNonNumbers?: boolean;
}): number[] {
	let result: (number | undefined)[] = this.map((i) => parseInt(i, options?.radix ?? 10));
	if (options?.safe !== false && !options?.keepNonNumbers) {
		result = result.filter((i) => i !== undefined && !isNaN(i));
	} else if (options?.keepNonNumbers) {
		result = result.map((i) => (i !== undefined && isNaN(i) ? undefined : i));
	}
	return result as number[];
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

const min = function (this: number[], count?: number): number | number[] {
	return minOf(this, count);
};

Object.assign(Array.prototype, { min });

const max = function (this: number[], count?: number): number | number[] {
	return maxOf(this, count);
};

Object.assign(Array.prototype, { max });

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
