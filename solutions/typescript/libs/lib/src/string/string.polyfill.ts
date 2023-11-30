import { GridGraph, type GridGraphOptions } from '../model/graph/index.js';
import type { ToString, Vec2, Vec2String } from '../model/index.js';
import { NEWLINE } from '../regex/index.js';
import { alphabeticalOrder } from './alphabetical-order.function.js';
import { rightSplit } from './right-split.function.js';
import { splitIntoStringPair } from './split-into-tuple.function.js';
import { stringToMatrix } from './string-to-matrix.function.js';
import { stringToVectorMap } from './string-to-vectormap.function.js';
import { vectorsInStringTile } from './vectors-in-string-tile.function.js';
export * from '../array/array.polyfill.js'; // `toInt` is used in `splitToInt`

declare global {
	interface String {
		alphabeticalOrder(): number;
		toInt(radix?: number): number;
		toMatrix(): string[][];
		toGridGraph<T extends ToString>(
			gridOptions?: GridGraphOptions<T> & {
				valueConverter?: (value: string) => T;
			},
		): GridGraph<T>;
		toVectorMap<V = string>(valueConverter?: (value: string) => V): Map<Vec2String, V>;
		/**
		 * @deprecated TODO: remove
		 */
		vectorsOf(character: string, fromBottom?: boolean): Vec2[];
		rightSplit(delimiter?: string): [string, string] | [string];
		lines(keepEmpty?: boolean): string[];
		splitToInt(options: {
			delimiter?: {
				[Symbol.split](string: string, limit?: number): string[];
			};
			keepEmptyLines: true;
			trim?: boolean;
			toIntOptions?: { radix?: number; safe?: boolean };
		}): (number | undefined)[];
		splitToInt(
			options?:
				| {
						delimiter?: {
							[Symbol.split](string: string, limit?: number): string[];
						};
						keepEmptyLines?: boolean;
						trim?: boolean;
						toIntOptions?: { radix?: number; safe?: boolean };
				  }
				| {
						delimiter?: {
							[Symbol.split](string: string, limit?: number): string[];
						};
						keepEmptyLines: false;
						trim?: boolean;

						toIntOptions?: { radix?: number; safe?: boolean };
				  },
		): number[];
		isLowerCase(): boolean;
		isUpperCase(): boolean;
		splitIntoStringPair(delimiter?: string | RegExp): [string, string];
	}
}

String.prototype.splitIntoStringPair = function (delimiter?: string | RegExp): [string, string] {
	return splitIntoStringPair(this as string, delimiter);
};

String.prototype.alphabeticalOrder = function (): number {
	return alphabeticalOrder(this as string);
};

String.prototype.toInt = function (radix = 10): number {
	return Number.parseInt(this as string, radix);
};

String.prototype.isLowerCase = function (): boolean {
	return this.toLowerCase() === this;
};

String.prototype.isUpperCase = function (): boolean {
	return this.toUpperCase() === this;
};

String.prototype.toGridGraph = function <T extends ToString>(
	gridOptions?: GridGraphOptions<T> & {
		valueConverter?: (value: string) => T;
	},
): GridGraph<T> {
	return GridGraph.fromString(this as string, gridOptions);
};

String.prototype.toVectorMap = function <V = string>(
	valueConverter?: (value: string) => V,
): Map<Vec2String, V> {
	return stringToVectorMap(this as string, { valueConverter });
};

String.prototype.lines = function (keepEmpty = false): string[] {
	const lines = this.split(/\n+/g);
	return keepEmpty ? lines : lines.filter((line) => !!line);
};

String.prototype.splitToInt = function (options?: {
	delimiter?: { [Symbol.split](string: string, limit?: number): string[] };
	keepEmptyLines?: boolean;
	toIntOptions?: { radix?: number; safe?: boolean };
	trim?: boolean;
}): number[] {
	const keepEmptyLines = options?.keepEmptyLines ?? false;
	const trimmed = options?.trim === false ? this : this.trim();
	let split = trimmed.split(options?.delimiter ?? /\r?\s/g);
	if (!keepEmptyLines) {
		split = split.filter((line) => !!line); // Filter out empty lines
	}
	return split.toInt({
		...options?.toIntOptions,
		keepNonNumbers: keepEmptyLines,
	});
};

String.prototype.toMatrix = function (
	rowSeparator: RegExp | string = NEWLINE,
	itemSeparator: RegExp | string = '',
): string[][] {
	return stringToMatrix(this as string, rowSeparator, itemSeparator);
};

String.prototype.vectorsOf = function (character: string, fromBottom = false): Vec2[] {
	return vectorsInStringTile(this as string, character, fromBottom);
};

String.prototype.rightSplit = function (delimiter = ' '): [string, string] | [string] {
	return rightSplit(this as string, delimiter);
};
