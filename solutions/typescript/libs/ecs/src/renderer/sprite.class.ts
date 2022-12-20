import { BoundingBox } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';

/**
 * Rendered frames are always locally positioned, the top left is always 0,0
 * This can be moved to the world position, then translate that to a camera
 * position
 */
export class Sprite {
	matrix: string[][] = [];
	private _boundingBox: BoundingBox;

	constructor(matrix?: string[][]) {
		this.matrix = matrix ?? [];
		this._boundingBox = BoundingBox.fromMatrix(this.matrix);
	}

	static fromString(render: string, flipY = false): Sprite {
		const matrix = stringToMatrix(render);
		return new Sprite(flipY ? matrix.reverse() : matrix);
	}

	/**
	 * Resets the frame to a sized matrix
	 */
	blank(size: BoundingBox): void {
		this.matrix = size.createBlankMatrix(() => ' ');
	}

	get boundingBox(): BoundingBox {
		return this._boundingBox;
	}

	/**
	 * Copies the content of this render onto another
	 */
	apply(targetFrame: Sprite): void {
		const offset = 1;
		for (let y = 0; y < this.matrix.length; y++) {
			const row = this.matrix[y];
			const renderRow = targetFrame.matrix[y + offset];
			for (let x = 0; x < this.matrix.length; x++) {
				renderRow[x + offset] = row[x];
			}
		}
	}
}
