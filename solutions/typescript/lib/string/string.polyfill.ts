import { Vec2 } from '@lib/model';
import { NEWLINE } from '@lib/regex';
import { rightSplit } from './right-split.function';
import { stringToMatrix } from './string-to-matrix.function';
import { vectorsInStringTile } from './vectors-in-string-tile.function';

declare global {
	interface String {
		toMatrix(): string[][];
		vectorsOf(character: string, fromBottom?: boolean): Vec2[];
		rightSplit(delimiter?: string): [string, string] | [string];
		splitToInt(
			delimiter?: { [Symbol.split](string: string, limit?: number): string[] },
			radix?: number
		): number[];
	}
}

String.prototype.splitToInt = function (delimiter = /\s+/g, radix = 10): number[] {
	return this.split(delimiter).toInt(radix);
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
