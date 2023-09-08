import type { ToString } from '../model/index.js';
import { NEWLINE } from '../regex/index.js';

/**
 * Joins a matrix of strings together while respecting the newlines in them
 *
 * @param tileMatrix to merge
 * @param separation leave a gap betweeen tiles
 */
export const mergeTileMatrix = <T extends ToString>(
	tileMatrix: T[][],
	separation = false,
): string => {
	const result: string[] = [];
	for (const tileRow of tileMatrix) {
		const rowsOfTiles = tileRow.map((rb) => rb.toString().trim().split(NEWLINE));
		const tileHeight = (rowsOfTiles[0]?.length ?? 0) - 1;
		for (let i = 0; i <= tileHeight; i++) {
			result.push(rowsOfTiles.map((rb) => rb[i]).join(separation ? ' ' : ''));
		}
		if (separation) {
			result.push(''.repeat(result.at(-1)?.length ?? 0));
		}
	}
	return result.join('\n') + '\n';
};
