import { Vec2 } from '@lib/model';
import { NEWLINE } from '@lib/regex';
import { stringToMatrix } from './string-to-matrix.function';
import { vectorsInStringTile } from './vectors-in-string-tile.function';

declare global {
	interface String {
		toMatrix(): string[][];
		vectorsOf(character: string, fromBottom?: boolean): Vec2[];
	}
}

String.prototype.toMatrix = function (
	rowSeparator: RegExp | string = NEWLINE,
	itemSeparator: RegExp | string = ''
): string[][] {
	return stringToMatrix(this as string, rowSeparator, itemSeparator);
};

String.prototype.vectorsOf = function (character: string, fromBottom = false): Vec2[] {
	return vectorsInStringTile(this as string, character, fromBottom);
};
