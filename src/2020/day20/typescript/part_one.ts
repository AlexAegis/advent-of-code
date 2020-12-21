import { bench, read, split } from '@lib';
import { mult } from '@lib/math';
import { day, year } from '.';

export class Tile {
	height = 0;

	tiles: string[] = [];

	left?: number;
	right?: number;
	top?: number;
	bottom?: number;
	matches = 0;
	bMatches: number[] = [0, 0, 0, 0];
	constructor(public index: number) {}

	public addLine(line: string): void {
		this.tiles.push(line);
		this.height++;
	}

	public getBorder(side: number, reversed = false): string {
		let result: string;
		if (side === 0) {
			// TOP BORDER left to right
			result = this.tiles[0];
		} else if (side === 1) {
			// RIGHT BORDER top to bottom
			result = this.tiles.map((t) => t[t.length - 1]).join('');
		} else if (side === 2) {
			// BOTTOM BORDER left to right
			result = this.tiles[this.tiles.length - 1];
		} else {
			// LEFT BORDER top to bottom
			result = this.tiles.map((t) => t[0]).join('');
		}
		return reversed ? [...result].reverse().join('') : result;
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

	for (let i = 0; i < tiles.length; i++) {
		const tileA = tiles[i];
		for (let j = i + 1; j < tiles.length; j++) {
			const tileB = tiles[j];
			for (let aBorder = 0; aBorder < 4; aBorder++) {
				for (let bBorder = 0; bBorder < 4; bBorder++) {
					for (let aFlip = 0; aFlip < 2; aFlip++) {
						for (let bFlip = 0; bFlip < 2; bFlip++) {
							if (
								tileA.getBorder(aBorder, aFlip === 1) ===
								tileB.getBorder(bBorder, bFlip === 1)
							) {
								tileA.bMatches[aBorder]++;
								tileB.bMatches[bBorder]++;
							}
						}
					}
				}
			}
		}
	}

	for (let i = 0; i < tiles.length; i++) {
		const tileA = tiles[i];

		for (let aBorder = 0; aBorder < 4; aBorder++) {
			for (let aFlip = 0; aFlip < 2; aFlip++) {
				if (tileA.getBorder(aBorder, aFlip === 1) === '#.##...##.') {
					console.log(
						'found in ',
						tileA.index,
						aBorder,
						aFlip,
						tileA.getBorder(aBorder, aFlip === 1)
					);
				}
			}
		}
	}

	const a = tiles.map((t) => `${t.index}, ${JSON.stringify(t.bMatches)}`).join('\n');
	console.log(a);
	return tiles
		.filter((tile) => tile.matches === 4)
		.map((tile) => tile.index)
		.reduce(mult, 1);
};

// istanbul ignore next
if (require.main === module) {
	(async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day, 'example.1.txt'), runner)}`))(); // 265 ~0.3ms
	// (async () => console.log(`Result: ${await bench(read(year, day), runner)}`))(); // 265 ~0.3ms
}
