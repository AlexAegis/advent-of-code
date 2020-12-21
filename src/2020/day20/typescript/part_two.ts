import { bench, read, split } from '@lib';
import { Direction, Vec2, Vec2Like } from '@lib/model';
import { NEWLINE } from '@lib/regex';
import { day, year } from '.';

const rotateMatrix = <T>(matrix: T[][], direction: 'r' | 'l' = 'r'): T[][] => {
	const result: T[][] = [];
	for (let x = 0; x < (direction === 'r' ? matrix[0].length : matrix.length); x++) {
		result.push([]);
	}
	for (let y = 0; y < matrix.length; y++) {
		const row = matrix[y];
		for (let x = 0; x < row.length; x++) {
			if (direction === 'r') {
				result[x][matrix.length - 1 - y] = row[x];
			} else {
				result[row.length - 1 - x][y] = row[x];
			}
		}
	}
	return result;
};

const flipMatrix = <T>(matrix: T[][], axis: 'y' | 'x' = 'x'): T[][] => {
	if (axis === 'x') {
		matrix = matrix.reverse();
	} else {
		matrix = matrix.map((row) => [...row].reverse());
	}
	return matrix;
};

export enum JigsawPieceSideOrder {
	TOP = 0,
	RIGHT = 1,
	BOTTOM = 2,
	LEFT = 3,
	TOPFLIPPED = 4,
	RIGHTFLIPPED = 5,
	BOTTOMFLIPPED = 6,
	LEFTFLIPPED = 7,
}

/**
 * Strategy:
 * Find all corners
 * pick on corner, that will be the anchor, fix its orientation everything else is relative
 * find a sidepiece that matches, go and do it side - 1 times, then a corner piece, rinse and repeat until the border is done.
 *
 *
 *
 */
export class Sea {
	sea: Tile[][][] = [];
	/**
	 *
	 * @param size this squared gives the size of the image
	 */
	constructor(public readonly size: number) {
		for (let y = 0; y < this.size; y++) {
			const row = [];
			for (let x = 0; x < this.size; x++) {
				row.push([]); // probable Tiles
			}
			this.sea.push(row);
		}
	}

	public getCorners(): Vec2Like[] {
		return [
			{ x: 0, y: 0 },
			{ x: this.size - 1, y: 0 },
			{ x: this.size - 1, y: this.size - 1 },
			{ x: 0, y: this.size - 1 },
		];
	}

	public getSides(): Vec2Like[] {
		for (let y = 0; y < this.size; y++) {
			const row = [];
			for (let x = 0; x < this.size; x++) {
				row.push([]); // probable Tiles
			}
			this.sea.push(row);
		}
		return [];
	}
}

export class Tile {
	height = 0;

	tiles: string[][] = [];

	/**
	 * Starts with everything then
	 */
	availableOrientations = [];

	constructor(public index: number) {}

	public addLine(line: string): void {
		this.tiles.push(line.split(''));
		this.height++;
	}

	public flip(axis: 'y' | 'x'): this {
		if (axis === 'x') {
			this.tiles = this.tiles.reverse();
		} else {
			this.tiles = this.tiles.map((row) => [...row].reverse());
		}
		return this;
	}

	public rotate(direction: 'r' | 'l' = 'r'): this {
		const result: string[][] = [];
		for (let x = 0; x < (direction === 'r' ? this.tiles[0].length : this.tiles.length); x++) {
			result.push([]);
		}
		for (let y = 0; y < this.tiles.length; y++) {
			const row = this.tiles[y];
			for (let x = 0; x < row.length; x++) {
				if (direction === 'r') {
					result[x][this.tiles.length - 1 - y] = row[x];
				} else {
					result[row.length - 1 - x][y] = row[x];
				}
			}
		}
		this.tiles = result; //.map((r) => r.join(''));
		return this;
	}

	/**
	 *
	 * @param side this tiles state
	 * @param matchedSide the other anchor tiles side thats matching
	 */
	public rotateToState(side: number, matchedSide: number): void {
		const thisBorder = side % 4;
		const flipped = side >= 4;

		//const targetSide = (matchedSide + 2) % 4; // The other side

		if (flipped) {
			console.log('BEFFLIPP', thisBorder % 2 === 0 ? 'x' : 'y');
			// this.flip(otherSide % 2 === 0 ? 'y' : 'x');
			// this.flip(thisBorder % 2 === 0 ? 'x' : 'y'); // cprrect
		}

		console.log(
			'ROT TO STATE INIT STATE, matchedSide:',
			matchedSide,
			'thisBorder:',
			thisBorder,
			'flipped',
			flipped
		);
		console.log(
			'min',
			Math.min(matchedSide, thisBorder),
			'max',
			Math.max(matchedSide, thisBorder)
		);
		// if the
		// let rotationDirection: "r" | "l" = matchedSide < otherSide ? 'r' : "l";

		for (
			let targetSide = thisBorder;
			targetSide !== matchedSide;
			targetSide = (targetSide + 1) % 4
		) {
			console.log('ROTATEW', targetSide);
			this.rotate('r');
		}
		console.log('targetSid');
		// for (let i = Math.min(matchedSide, otherSide); i < Math.max(matchedSide, otherSide); i++) {
		// 	console.log('rotating', matchedSide < otherSide ? 'r' : 'l');
		// 	this.rotate(matchedSide < otherSide ? 'r' : 'l');
		// }
		// console.log('afterrots, matchedSide', matchedSide);
		// console.log(this.toString());

		// x flip = '-'
		// y flip = '|'
		if (flipped) {
			console.log('FLIPP');
			// 7 => y flip (|)
			// 2 =>
			// this.flip(matchedSide % 2 === 0 ? 'x' : 'y'); // okay
			// this.flip(otherSide % 2 === 0 ? 'y' : 'x');
			// this.flip('x');
			// this.flip('y');
		}
		// this.flip(matchedSide % 2 === 0 ? 'y' : 'x');
		// 	this.flip(matchedSide % 2 === 0 ? 'y' : 'x');
	}

	public findForBorder(among: Tile[], thisBorder: JigsawPieceSideOrder): Tile | undefined {
		const thisSide = this.getBorder(thisBorder).join('');
		for (const t of among) {
			for (const flipped of t.flipFlop()) {
				if (flipped.getBorder((thisBorder + 2) % 4).join('') === thisSide) {
					return flipped;
				}
			}
		}
		return undefined;
	}

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
		if (side === 0) {
			// RIGHT BORDER top to bottom
			result = this.tiles.map((t) => t[t.length - 1]);
		} else if (side === 1) {
			// TOP BORDER left to right
			result = this.tiles[0];
		} else if (side === 2) {
			// LEFT BORDER --top to bottom--
			result = this.tiles.map((t) => t[0]);
		} else {
			// BOTTOM BORDER left to right
			result = this.tiles[this.tiles.length - 1];
		}
		return reversed ? result.reverse() : result;
	}

	public toString(border = true): string {
		if (border) {
			return this.tiles.map((r) => r.join('')).join('\n');
		} else {
			return this.tiles
				.slice(1, this.tiles.length - 1)
				.map((r) => r.slice(1, r.length - 1).join(''))
				.join('\n');
		}
	}
}

export const runner = (input: string): number => {
	const lines = split(input);
	const tiles: Tile[] = [];

	for (const line of lines) {
		if (line.endsWith(':')) {
			const [, nc] = line.split(' ');
			const [n] = nc.split(':');
			console.log('nowParsing', n);
			tiles.push(new Tile(parseInt(n, 10)));
		} else if (line !== '') {
			tiles[tiles.length - 1].addLine(line);
		}
	}

	const sqrSide = Math.sqrt(tiles.length);
	console.log('sqrSide', sqrSide);

	const expandTile = (
		tile: Tile | undefined,
		currentPosition: Vec2,
		fromDir: Direction | undefined,
		allTiles: Tile[],
		tileMap: Map<string, Tile>,
		checkedPositions = new Set<string>(),
		found = new Set<Tile>()
	) => {
		console.log(
			'curr tile',
			tile?.index,
			'currentPosition',
			currentPosition.toString(),
			' other tiles c:',
			allTiles.length,
			'allTiles',
			allTiles.map((a) => a.index).join(',')
		);
		if (tile && found.has(tile)) {
			return;
		}

		if (checkedPositions.has(currentPosition.toString())) {
			return;
		} else {
			checkedPositions.add(currentPosition.toString());
		}
		if (tile) {
			tileMap.set(currentPosition.toString(), tile);
			// allTiles.removeItem(tile);
			found.add(tile);
		} else {
			return;
		}

		/*const cc = Direction.cardinalDirections
			.filter((d) => d.reverse() !== fromDir)
			.map((d) => currentPosition.clone().addMut(d))
			.map((d) => d.toString());

		console.log(
			'checkfrom',
			currentPosition.toString(),
			'fromDir',
			fromDir?.toString(),
			cc.join(';')
		);*/
		/*.filter((a) => !checkedPositions.has(a.next.toString()))*/
		for (const a of Direction.cardinalDirections
			//	.filter((d) => d.reverse() !== fromDir)
			.map((direction, directionIndex) => ({
				direction,
				directionIndex,
				next: currentPosition.clone().addMut(direction),
			}))) {
			console.log('nexttocheck', a.next.toString());
			const result = tile.findForBorder(
				allTiles.filter((at) => !found.has(at) && at !== tile),
				a.directionIndex
			);
			console.log('RESUUUUUl', result);
			expandTile(
				result,
				a.next,
				a.direction,
				allTiles /*.filter((at) => at !== result)*/,
				tileMap,
				checkedPositions,
				found
			);
		}
	};
	const tilesCopy = [...tiles];
	const tileMap = new Map<string, Tile>();
	// 	const anchorTile = tilesCopy.shift()!;
	// tileMap.set(Vec2.ORIGIN.toString(), anchorTile);
	expandTile(tilesCopy[0], Vec2.ORIGIN, undefined, tilesCopy, tileMap);
	console.log('ENDING TILECOPYSIYE', tilesCopy.length);

	const findMapCorners = (coords: string[]) => {
		const vecs = coords.map((c) => new Vec2(c));
		let topLeft = vecs[0];
		let botRight = vecs[0];
		for (const v of vecs) {
			if (v.compareRowFirst(topLeft) < 0) {
				topLeft = v;
			}
			if (v.compareRowFirst(botRight) > 0) {
				botRight = v;
			}
		}

		return { topLeft, botRight };
	};

	const printPuzzle = (tileMap: Map<string, Tile>) => {
		const result: string[][] = [];
		const cons = findMapCorners([...tileMap.keys()]);
		console.log(JSON.stringify(cons));
		for (let y = cons.topLeft.y; y <= cons.botRight.y; y++) {
			const row: string[] = [];
			for (let x = cons.topLeft.x; x <= cons.botRight.x; x++) {
				console.log('NOW PRINTINT', new Vec2(x, y).toString());
				const tile = tileMap.get(new Vec2(x, y).toString());
				if (tile) {
					row.push(tile.toString(false));
				} else {
					row.push(('_'.repeat(10) + '\n').repeat(10));
				}
			}
			result.unshift(row);
		}
		console.log('ASFDASFA', result.length, result[0].length);
		return result;
	};

	const mergeMatrix = (map: string[][]) => {
		const result: string[] = [];
		for (const rowBlock of map) {
			const splatted = rowBlock.map((rb) => rb.split('\n'));
			const height = splatted[0].length - 1; // 9
			for (let i = 0; i <= height; i++) {
				result.push(splatted.map((rb) => rb[i]).join(''));
			}
		}
		return result.join('\n');
	};

	console.log('tileMap.size', tileMap.size);

	const unmergedMap = printPuzzle(tileMap);

	const r1m = rotateMatrix(unmergedMap);
	const r2m = rotateMatrix(r1m);
	const r3m = rotateMatrix(r2m);
	const r4m = rotateMatrix(r3m);
	const rf1m = flipMatrix(r4m, 'x');
	const rf2m = rotateMatrix(rf1m);
	const rf3m = rotateMatrix(rf2m);
	const rf4m = rotateMatrix(rf3m);

	const mr1m = mergeMatrix(r1m);
	const mr2m = mergeMatrix(r2m);
	const mr3m = mergeMatrix(r3m);
	const mr4m = mergeMatrix(r4m);
	const mrf1m = mergeMatrix(rf1m);
	const mrf2m = mergeMatrix(rf2m);
	const mrf3m = mergeMatrix(rf3m);
	const mrf4m = mergeMatrix(rf4m);
	console.log(mr1m, mr2m, mr3m, mr4m, mrf1m, mrf2m, mrf3m, mrf4m);
	// const mergedMap = mergeMatrix(rotateMatrix(flipMatrix(rotateMatrix(unmergedMap), 'y')));

	const monster = `                  #
#    ##    ##    ###
 #  #  #  #  #  #   `.split(NEWLINE);

	const flippedMonster = monster.map((ml) => [...ml].reverse().join(''));
	console.log(
		JSON.stringify(monster, undefined, 2),
		JSON.stringify(flippedMonster, undefined, 2)
	);
	const normalMonsters: Vec2[] = [];

	for (let y = 0; y < 3; y++) {
		const row = monster[y];
		for (let x = 0; x < row.length; x++) {
			if (row[x] === '#') {
				normalMonsters.push(new Vec2(x, y));
			}
		}
	}

	// const leftRotatedMonsters = normalMonsters.map((i) => i.clone().rotateLeft());
	// const upsideDownRotatedMonsters = leftRotatedMonsters.map((i) => i.clone().rotateLeft());
	// const rightRotatedMonsters = upsideDownRotatedMonsters.map((i) => i.clone().rotateLeft());
	// console.log(rightRotatedMonsters);
	const splitmap = mrf4m.split(NEWLINE);

	const allTiles = new Set<string>();
	const monsterTiles = new Set<string>();
	for (let y = 0; y < splitmap.length /* - monster.length*/; y++) {
		const row = splitmap[y];
		for (let x = 0; x < row.length /* - monster[0].length*/; x++) {
			allTiles.add(new Vec2(x, y).toString());

			const relativeMonsterTiles = normalMonsters.map((d) => d.clone().addMut({ x, y }));

			console.log(relativeMonsterTiles);
			if (relativeMonsterTiles.every((d) => (splitmap[d.y]?.[d.x] ?? '*') === '#')) {
				relativeMonsterTiles.forEach((d) => monsterTiles.add(d.toString()));
			}
		}
	}

	// console.log(mergedMap);
	// unmergedMap.map(m => trimMatrix(m))
	console.log('simple sub', allTiles.size - monsterTiles.size);
	return [...allTiles.values()].filter((at) => !monsterTiles.has(at)).length;
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
