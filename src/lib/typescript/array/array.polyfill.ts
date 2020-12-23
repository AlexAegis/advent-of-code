import { asc, desc, max, min, mult, sum } from '@lib/math';
import { addAllToSet } from '@lib/set';
import { cutSubSegment } from './cut-subsegment.function';
import { findEndOfPair } from './find-end-of-pair.function';
import { matrixFlipFlop } from './flip-flop.generator';
import { flipMatrix } from './flip-matrix.function';
import { rotateMatrix } from './rotate-matrix.function';

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
		sum(): number;
		product(): number;
		min(): T;
		max(): T;
		asc(): T[];
		desc(): T[];
		clone(): T[];
	}
}

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
	return this.reduce(min, undefined);
};

Array.prototype.max = function <T>(): T {
	return this.reduce(max, undefined);
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
