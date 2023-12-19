import { isNumberArray } from '../functions/assertions/is-numeric.assert.js';
import { ascending, descending, mult, sum } from '../math/common/basic-operations.functions.js';
import type { SizedTuple } from '../model/sized-tuple.type.js';
import { addAllToSet } from '../set/add-all-to-set.function.js';
import { arrayContains } from './array-contains.function.js';
import { arrayDiff, type ArrayDiffResult } from './array-diff.function.js';
import { cutSubSegment } from './cut-subsegment.function.js';
import { filterMap } from './filter-map.function.js';
import { findEndOfPair } from './find-end-of-pair.function.js';
import { findLast } from './find-last.function.js';
import { matrixFlipFlop } from './flip-flop.generator.js';
import { flipMatrix } from './flip-matrix.function.js';
import { getSizedGroups } from './get-sized-groups.function.js';
import { groupByDelimiter } from './group-by-delimiter.function.js';
import { pairwise } from './groups/pairwise.function.js';
import { slideWindow } from './groups/slide-window.function.js';
import { mapFirst } from './map-first.function.js';
import { mapLast } from './map-last.function.js';
import { maxOf } from './max-of.function.js';
import { mean } from './mean.function.js';
import { median } from './median.function.js';
import { minOf } from './min-of.function.js';
import { pairsWith } from './pairs-with.function.js';
import { partition } from './partition.function.js';
import { peek } from './peek.function.js';
import { reduceIfAllTheSame } from './reduce-if-all-the-same.function.js';
import { rotateMatrix } from './rotate-matrix.function.js';
import { zip } from './zip.function.js';

declare global {
	interface Array<T> {
		first(offset?: number): T;
		last(offset?: number): T;
		findEndOfPair(pairs: [T, T], from: number): number | undefined;
		cutSubSegment(pairs: [T, T], from: number): T[] | undefined;
		removeItem(item: T): boolean;
		flipMatrix(axis: 'y' | 'x'): T[];
		rotateMatrix(direction: 'r' | 'l'): T[];
		flipFlop(): Generator<T[]>;
		contains(item: T): boolean;
		intoSet(set?: Set<T>): Set<T>;
		tap(callbackFn: (item: T, index: number) => void): T[];
		toInt(
			options?:
				| { radix?: number; safe?: boolean; keepNonNumbers: false }
				| { radix?: number; safe?: boolean; keepNonNumbers?: boolean },
		): number[];
		toInt(options?: {
			radix?: number;
			safe?: boolean;
			keepNonNumbers: true;
		}): (number | undefined)[];
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
		filterMap<V>(mapFn: (t: T, i: number) => V | undefined): V[];
		partition(partitioner: (a: T) => boolean): [T[], T[]];
		pairwise(callback: (a: T, b: T) => void): void;
		slideWindow<N extends number = 2>(windowSize?: N, stepSize?: number): SizedTuple<T, N>[];
		bubbleFindPair(comparator: (a: T, b: T) => boolean): [T, T];
		walkPairs(): Generator<[T, T]>;
		pairs(): [T, T][];
		unique(comparator?: (a: T, b: T) => boolean): T[];
		pairsWith<N = T>(other?: N[], onlyUnique?: boolean): [T, N][];
		getSizedGroups(groupSize: number): T[][];
		findLast<V extends T>(
			predicate: (t: T, i: number) => boolean,
			skipCount?: number,
		): V | undefined;
		mapFirst<V>(map: (t: T) => V): V | undefined;
		mapLast<V>(map: (t: T) => V): V | undefined;
		zip<U>(other: U[]): [T, U][];
		diff(other: T[]): ArrayDiffResult<T>;
		clear(): void;
		/**
		 *
		 * @param isDelimiter by default it checks if a value is falsy or not
		 */
		groupByDelimiter(isDelimiter?: (t: T) => boolean): T[][];
		/**
		 * If every element is the same, return that.
		 *
		 * @param minimumLength even if all elements are the same, if the length
		 * is below this value, it will still return undefined.
		 */
		reduceIfAllTheSame(minimumLength?: number): T | undefined;
	}
}

Array.prototype.diff = function <T>(other: T[]): ArrayDiffResult<T> {
	return arrayDiff(this, other);
};

Array.prototype.zip = function <T, U>(other: U[]): [T, U][] {
	return zip(this, other);
};

Array.prototype.mapFirst = function <T, V>(this: T[], mapFn: (t: T) => V): V | undefined {
	return mapFirst(this, mapFn);
};

Array.prototype.mapLast = function <T, V>(this: T[], mapFn: (t: T) => V): V | undefined {
	return mapLast(this, mapFn);
};

Array.prototype.clear = function (): void {
	this.splice(0);
};

Array.prototype.findLast = function <T>(
	this: T[],
	predicate: (t: T, i: number) => boolean,
	skipCount: number,
): T | undefined {
	return findLast(this, predicate, skipCount);
};

Array.prototype.pairs = function <T>(): [T, T][] {
	return [...this.walkPairs()];
};

Array.prototype.walkPairs = function* <T>(): Generator<[T, T]> {
	for (let i = 0; i < this.length - 1; i++) {
		for (let j = i + 1; j < this.length; j++) {
			yield [this[i], this[j]];
		}
	}
};

Array.prototype.groupByDelimiter = function <T>(this: T[], isDelimiter?: (t: T) => boolean): T[][] {
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
	this: T[],
	until: (element: T, iteration: number) => boolean,
): IterableIterator<T> {
	for (let i = 0; ; i++) {
		for (const element of this) {
			yield element;
			if (until(element, i)) {
				return;
			}
		}
	}
};

Array.prototype.pairsWith = function <T, N = T>(other?: N[], onlyUnique = false): [T, N][] {
	return pairsWith(this, other, onlyUnique);
};

Array.prototype.first = function <T>(offset = 0): T {
	return this[offset];
};

Array.prototype.last = function <T>(offset = 0): T {
	return this[this.length - (offset + 1)];
};

Array.prototype.unique = function <T>(this: T[], comparator?: (a: T, b: T) => boolean): T[] {
	const result: T[] = [];
	for (const item of this) {
		if (!result.some((r) => (comparator ? comparator(r, item) : r === item))) {
			result.push(item);
		}
	}
	return result;
};

Array.prototype.filterMap = function <T, V>(mapFn: (t: T, i: number) => V | undefined): V[] {
	return filterMap(this, mapFn);
};

Array.prototype.tap = function <T>(this: T[], callbackFn: (item: T, index: number) => void): T[] {
	for (let i = 0; i < this.length; i++) {
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		callbackFn(this[i]!, i);
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

Array.prototype.count = function <T>(this: T[], predicate: (t: T) => boolean): number {
	let count = 0;
	for (const element of this) {
		if (predicate(element)) {
			count++;
		}
	}
	return count;
};

Array.prototype.slideWindow = function <T, N extends number>(
	windowSize: N = 2 as N,
	stepSize = 1,
): SizedTuple<T, N>[] {
	return slideWindow(this, windowSize, stepSize);
};

Array.prototype.pairwise = function <T>(this: T[], callback: (a: T, b: T) => void): void {
	pairwise(this, callback);
};

Array.prototype.partition = function <T>(this: T[], partitioner: (a: T) => boolean): [T[], T[]] {
	return partition(this, partitioner);
};

Array.prototype.bubbleFindPair = function <T>(
	this: T[],
	comparator: (a: T, b: T) => boolean,
): [T | undefined, T | undefined] {
	for (let i = 0; i < this.length - 1; i++) {
		const ei = this[i];
		for (let j = i + 1; j < this.length; j++) {
			const ej = this[j];
			if (ei !== undefined && ej !== undefined && comparator(ei, ej)) {
				return [ei, ej];
			}
		}
	}
	return [undefined, undefined];
};

Array.prototype.contains = function <T>(item: T): boolean {
	return arrayContains(this, item);
};

Array.prototype.toInt = function (
	this: string[],
	options?: {
		radix?: number;
		safe?: boolean;
		keepNonNumbers?: boolean;
	},
): number[] {
	let result: (number | undefined)[] = this.map((i) => Number.parseInt(i, options?.radix ?? 10));
	if (options?.safe !== false && !options?.keepNonNumbers) {
		result = result.filter((i) => i !== undefined && !Number.isNaN(i));
	} else if (options?.keepNonNumbers) {
		result = result.map((i) => (i !== undefined && Number.isNaN(i) ? undefined : i));
	}
	return result as number[];
};

Array.prototype.clone = function <T>(this: T[]): T[] {
	return [...this];
};

Array.prototype.desc = function <T>(): T[] {
	return this.sort(descending);
};

Array.prototype.asc = function <T>(): T[] {
	return this.sort(ascending);
};

const min = function (this: number[], count?: number): number | number[] {
	return minOf(this, count);
};

Object.assign(Array.prototype, { min });

const max = function (this: number[], count?: number): number | number[] {
	return maxOf(this, count);
};

Object.assign(Array.prototype, { max });

Array.prototype.sum = function (this: number[]): number {
	return this.reduce(sum, 0);
};

Array.prototype.product = function (this: number[]): number {
	return this.reduce(mult, 1);
};

Array.prototype.intoSet = function <T>(set?: Set<T>): Set<T> {
	return addAllToSet(this, set);
};

Array.prototype.flipFlop = function* <T>(this: T[][]): Generator<T[][]> {
	yield* matrixFlipFlop(this);
};

Array.prototype.flipMatrix = function <T>(this: T[][], axis: 'y' | 'x' = 'x'): T[][] {
	return flipMatrix(this, axis);
};

Array.prototype.rotateMatrix = function <T>(this: T[][], direction: 'r' | 'l' = 'r'): T[][] {
	return rotateMatrix(this, direction);
};

Array.prototype.findEndOfPair = function <T>(pairs: [T, T], from = 0): number | undefined {
	return findEndOfPair(this, pairs, from);
};

Array.prototype.cutSubSegment = function <T>(pairs: [T, T], from = 0): T[] | undefined {
	return cutSubSegment(this, pairs, from);
};

Array.prototype.removeItem = function <T>(item: T): boolean {
	const index = this.indexOf(item);
	if (index >= 0) {
		this.splice(index, 1);
	}
	return index >= 0;
};

Array.prototype.reduceIfAllTheSame = function <T>(minimumLength?: number): T | undefined {
	return reduceIfAllTheSame(this, minimumLength);
};
