/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { flipMatrix, rotateMatrix } from '@alexaegis/advent-of-code-lib/array';
import { Direction, Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib/model';

export class Tile {
	tiles: string[][] = [];

	constructor(public index: number) {}

	public addLine(line: string): void {
		this.tiles.push([...line]);
	}

	public flip(axis: 'y' | 'x'): this {
		this.tiles = flipMatrix(this.tiles, axis);
		return this;
	}

	public rotate(direction: 'r' | 'l' = 'r'): this {
		this.tiles = rotateMatrix(this.tiles, direction);
		return this;
	}

	public findForBorder(tiles: Tile[], thisBorder: number): Tile | undefined {
		const thisSide = this.getBorder(thisBorder).join('');
		for (const tile of tiles) {
			for (const flipped of tile.flipFlop()) {
				if (flipped.getBorder((thisBorder + 2) % 4).join('') === thisSide) {
					return flipped;
				}
			}
		}
		return undefined;
	}

	/**
	 * Iterates through all the possible orientations
	 */
	public *flipFlop(): Generator<Tile> {
		yield this.rotate('r');
		yield this.rotate('r');
		yield this.rotate('r');
		yield this.rotate('r');
		yield this.flip('x');
		yield this.rotate('r');
		yield this.rotate('r');
		yield this.rotate('r');
		yield this.rotate('r');
	}

	/**
	 * Same numeric order as in cardinalDirs (E -> N -> W -> S)
	 */
	public getBorder(side: number, reversed = false): string[] {
		let result: string[];
		switch (side) {
			case 0: {
				result = this.tiles.map((t) => t.at(-1)!);

				break;
			}
			case 1: {
				result = this.tiles[0]!;

				break;
			}
			case 2: {
				result = this.tiles.map((t) => t[0]!);

				break;
			}
			default: {
				result = this.tiles.at(-1)!;
			}
		}
		return reversed ? result.reverse() : result;
	}

	public toString(border = true): string {
		return border
			? `${this.index}.`.padEnd(10, ' ') + '\n' + this.tiles.map((r) => r.join('')).join('\n')
			: this.tiles
					.slice(1, -1)
					.map((r) => r.slice(1, -1).join(''))
					.join('\n');
	}

	static alignTiles(
		tile: Tile | undefined,
		currentPosition: Vec2,
		allTiles: Tile[],
		tileMap: Map<Vec2String, Tile>,
		checkedPositions = new Set<string>(),
		found = new Set<Tile>(),
	): void {
		// If already visited the tile...
		if (tile && found.has(tile)) {
			return;
		}
		// ...or the position
		if (checkedPositions.has(currentPosition.toString())) {
			return;
		} else {
			checkedPositions.add(currentPosition.toString());
		}
		if (tile) {
			tileMap.set(currentPosition.toString(), tile);
			found.add(tile);
		} else {
			return;
		}

		for (const directions of Direction.cardinalDirections.map((direction, directionIndex) => ({
			direction,
			directionIndex,
			next: currentPosition.clone().addMut(direction),
		}))) {
			const result = tile.findForBorder(
				allTiles.filter((at) => !found.has(at) && at !== tile),
				directions.directionIndex,
			);

			Tile.alignTiles(
				result,
				directions.next,
				allTiles /*.filter((at) => at !== result)*/,
				tileMap,
				checkedPositions,
				found,
			);
		}
	}
}
