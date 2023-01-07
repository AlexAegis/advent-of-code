import { BoundingBox, Vec2 } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';

/**
 * Rendered frames are always locally positioned, the top left is always 0,0
 * This can be moved to the world position, then translate that to a camera
 * position
 */
export class Sprite {
	render: string[][] = [];
	private _renderBox: BoundingBox;
	private _box: BoundingBox;

	/**
	 *
	 * @param render a matrix that will represent the look of this Sprite
	 * @param boundingBox when not set, it will be calculated from the size
	 * of the render. When set it will let the render to be repeated within
	 * the box.
	 * TODO: repeat anchor
	 */
	constructor(render: string[][] = [[]], boundingBox?: BoundingBox) {
		this.render = render;
		this._renderBox = BoundingBox.fromMatrix(render);
		this._box = boundingBox ?? this._renderBox;
	}

	static fromString(render: string): Sprite {
		const matrix = stringToMatrix(render);
		return new Sprite(matrix);
	}

	static fromMatrix(matrix: string[][], boundingBox?: BoundingBox) {
		return new Sprite(matrix, boundingBox);
	}

	getCellAt(x: number, y: number): string | undefined {
		if (this._box.contains(x, y)) {
			return this.render[y % this._renderBox.height]?.[x % this._renderBox.width];
		} else {
			return undefined;
		}
	}

	/**
	 * Resets the frame to a sized matrix
	 */
	blank(size: BoundingBox): void {
		this.render = size.createBlankMatrix(() => ' ');
	}

	get boundingBox(): BoundingBox {
		return this._box;
	}

	//get visibleAt(): Vec2[] {
	//	return this._visibleAt;
	//}

	forEach(callback: (coordinate: Vec2, cell: string) => void): void {
		for (let y = 0; y < this.render.length; y++) {
			const row = this.render[y];
			for (let x = 0; x < row.length; x++) {
				callback(new Vec2(x, y), row[x]);
			}
		}
	}

	put(x: number, y: number, cell: string): void {
		this.render[y][x] = cell;
	}
}
