import { Vec2 } from '@lib/model';
import { GridGraph, GridGraphOptions } from '@lib/model/graph';
import { NEWLINE } from '@lib/regex';
import { rightSplit } from './right-split.function';
import { stringToMatrix } from './string-to-matrix.function';
import { stringToVectorMap } from './string-to-vectormap.function';
import { vectorsInStringTile } from './vectors-in-string-tile.function';

declare global {
	interface String {
		toMatrix(): string[][];
		toGridGraph<T>(
			gridOptions?: GridGraphOptions<T> & { valueConverter?: (value: string) => T }
		): GridGraph<T>;
		toVectorMap<V = string>(valueConverter?: (value: string) => V): Map<string, V>;
		vectorsOf(character: string, fromBottom?: boolean): Vec2[];
		rightSplit(delimiter?: string): [string, string] | [string];
		lines(keepEmpty?: boolean): string[];
		splitToInt(options?: {
			delimiter?: { [Symbol.split](string: string, limit?: number): string[] };
			toIntOptions?: { radix?: number; safe?: boolean };
		}): number[];
		isLowerCase(): boolean;
		isUpperCase(): boolean;
	}
}

String.prototype.isLowerCase = function (): boolean {
	return this.toLowerCase() === this;
};

String.prototype.isUpperCase = function (): boolean {
	return this.toUpperCase() === this;
};

String.prototype.toGridGraph = function <T>(
	gridOptions?: GridGraphOptions<T> & { valueConverter?: (value: string) => T }
): GridGraph<T> {
	return GridGraph.fromString(this as string, gridOptions);
};

String.prototype.toVectorMap = function <V = string>(
	valueConverter?: (value: string) => V
): Map<string, V> {
	return stringToVectorMap(this as string, valueConverter);
};

String.prototype.lines = function (keepEmpty = false): string[] {
	const lines = this.split(/\n+/g);
	return keepEmpty ? lines : lines.filter((line) => !!line);
};

String.prototype.splitToInt = function (options?: {
	delimiter?: { [Symbol.split](string: string, limit?: number): string[] };
	toIntOptions?: { radix?: number; safe?: boolean };
}): number[] {
	return this.split(options?.delimiter ?? /\s+/g)
		.filter((line) => !!line) // Filter out empty lines
		.toInt(options?.toIntOptions);
};

String.prototype.toMatrix = function (
	rowSeparator: RegExp | string = NEWLINE,
	itemSeparator: RegExp | string = ''
): string[][] {
	return stringToMatrix(this as string, rowSeparator, itemSeparator);
};

String.prototype.vectorsOf = function (character: string, fromBottom = false): Vec2[] {
	return vectorsInStringTile(this as string, character, fromBottom);
};

String.prototype.rightSplit = function (delimiter = ' '): [string, string] | [string] {
	return rightSplit(this as string, delimiter);
};
