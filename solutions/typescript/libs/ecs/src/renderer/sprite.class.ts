import { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';

/**
 * Rendered frames are always locally positioned, the top left is always 0,0
 * This can be moved to the world position, then translate that to a camera
 * position
 */
export class Sprite {
	matrix: string[][] = [];
	private _boundingBox!: BoundingBox;
	private _visibleAt!: Vec2[];

	constructor(matrix?: string[][]) {
		this.matrix = matrix ?? [];
		this.update();
	}

	private update(): void {
		this._boundingBox = BoundingBox.fromMatrix(this.matrix);
		this._visibleAt = [];
		this.forEach((position, cell) => {
			if (cell) {
				this._visibleAt.push(position);
			}
		});
	}

	static fromString(render: string): Sprite {
		const matrix = stringToMatrix(render);
		return new Sprite(matrix);
	}

	static fromMatrix(matrix: string[][]) {
		return new Sprite(matrix);
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

	get visibleAt(): Vec2[] {
		return this._visibleAt;
	}

	forEach(callback: (coordinate: Vec2, cell: string) => void): void {
		for (let y = 0; y < this.matrix.length; y++) {
			const row = this.matrix[y];
			for (let x = 0; x < row.length; x++) {
				callback(new Vec2(x, y), row[x]);
			}
		}
	}
}
