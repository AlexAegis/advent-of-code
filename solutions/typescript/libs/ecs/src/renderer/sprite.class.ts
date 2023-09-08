import { BoundingBox, mapMatrix, Vec2 } from '@alexaegis/advent-of-code-lib';
import { stringToMatrix } from '@alexaegis/advent-of-code-lib/string';
import type { Tile } from './tile.interface.js';

export interface SpriteOptions {
	defaultBackgroundColor?: string;
	defaultForegroundColor?: string;
	size?: BoundingBox;
}

export type NormalizedSpriteOptions = SpriteOptions;

export const normalizeSpriteOptions = (options?: SpriteOptions): NormalizedSpriteOptions => {
	return {
		...options,
	};
};

/**
 * Rendered frames are always locally positioned, the top left is always 0,0
 * This can be moved to the world position, then translate that to a camera
 * position
 */
export class Sprite {
	options: NormalizedSpriteOptions;
	render: Tile[][];
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
	constructor(render: Tile[][] = [[]], rawOptions?: SpriteOptions) {
		this.options = normalizeSpriteOptions(rawOptions);
		this.render = render;
		this._renderBox = BoundingBox.fromMatrix(render);
		this._box = this.options.size ?? this._renderBox;
	}

	static fromString(render: string, rawOptions?: SpriteOptions): Sprite {
		const matrix = stringToMatrix(render);
		return Sprite.fromMatrix(matrix, rawOptions);
	}

	static fromMatrix(matrix: string[][], rawOptions?: SpriteOptions) {
		const options = normalizeSpriteOptions(rawOptions);
		const tileMatrix: Tile[][] = mapMatrix(matrix, (char) =>
			Sprite.intoDefaultTile(char, options),
		);
		return new Sprite(tileMatrix, rawOptions);
	}

	getTileAt(x: number, y: number): Tile | undefined {
		return this._box.contains(x, y)
			? this.render[y % this._renderBox.height]?.[x % this._renderBox.width]
			: undefined;
	}

	private intoDefaultTile(tile?: string): Tile {
		return Sprite.intoDefaultTile(tile, this.options);
	}

	private static intoDefaultTile(
		char: string | undefined,
		options: NormalizedSpriteOptions,
	): Tile {
		return {
			char: char ?? ' ',
			bg: options.defaultBackgroundColor,
			fg: options.defaultForegroundColor,
		};
	}

	/**
	 * Resets the frame to a sized matrix
	 */
	blank(size: BoundingBox): void {
		this.render = size.createBlankMatrix(() => this.intoDefaultTile());
	}

	get boundingBox(): BoundingBox {
		return this._box;
	}

	forEach(callback: (coordinate: Vec2, cell: Tile) => void): void {
		for (let y = 0; y < this.render.length; y++) {
			const row = this.render[y];
			if (row) {
				for (let x = 0; x < row.length; x++) {
					const tile = row[x];
					if (tile) {
						callback(new Vec2(x, y), tile);
					}
				}
			}
		}
	}

	put(x: number, y: number, tile: Tile | string): void {
		const row = this.render[y];
		if (row) {
			row[x] = typeof tile === 'string' ? this.intoDefaultTile(tile) : tile;
		}
	}

	merge(x: number, y: number, tileLike: Tile | string): void {
		const tile = typeof tileLike === 'string' ? this.intoDefaultTile(tileLike) : tileLike;

		const renderTile = this.render[y]?.[x];
		if (renderTile) {
			if (tile.char) {
				renderTile.char = tile.char;
			}

			if (tile.fg) {
				renderTile.fg = tile.fg;
			}

			if (tile.bg) {
				renderTile.bg = tile.bg;
			}
		}
	}

	asStringMatrix(): string[][] {
		return mapMatrix(this.render, (tile) => tile.char ?? ' ');
	}
}
