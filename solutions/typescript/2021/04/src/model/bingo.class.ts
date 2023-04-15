import { Direction, Vec2, type Vec2String } from '@alexaegis/advent-of-code-lib/model';

export class Bingo {
	numbers = new Map<Vec2String, number>();
	coords = new Map<number, Vec2[]>();
	markedNumbers = new Set<Vec2String>();
	size: number;
	justMarked?: number;
	won = false;
	constructor(board: number[][]) {
		this.size = board.length;
		for (let y = 0; y < board.length; y++) {
			const row = board[y]!;
			for (let x = 0; x < row.length; x++) {
				const number = row[x]!;
				const coord = new Vec2(x, y);
				this.numbers.set(coord.toString(), number);
				if (this.coords.has(number)) {
					this.coords.get(number)?.push(coord);
				} else {
					this.coords.set(number, [coord]);
				}
			}
		}
	}

	markNumber(n: number): void {
		const locations = this.coords.get(n);
		if (locations) {
			this.justMarked = n;
			this.markedNumbers.addAll(locations.map((location) => location.toString()));
		}
	}

	isWinning(): boolean {
		for (const location of this.markedNumbers) {
			const v = new Vec2(location);
			for (const direction of Direction.cardinalDirections) {
				let next: Vec2 = v.clone();
				let c = 0;
				while (this.markedNumbers.has(next.toString())) {
					next = next.add(direction);
					c++;
				}
				if (c === this.size) {
					this.won = true;
					return true;
				}
			}
		}
		return false;
	}

	score(): number {
		const unmarkedNumbersSum = [...this.numbers.entries()]
			.filter(([coord]) => !this.markedNumbers.has(coord))
			.map(([, number]) => {
				return number;
			})
			.sum();
		return unmarkedNumbersSum * (this.justMarked ?? 1);
	}

	static run(boards: Bingo[], numbers: number[]): Bingo | undefined {
		for (const number of numbers) {
			for (const board of boards) {
				board.markNumber(number);
				if (board.isWinning()) {
					return board;
				}
			}
		}
		return undefined;
	}

	static runUntilLast(boards: Bingo[], numbers: number[]): Bingo | undefined {
		let lastWinner: Bingo | undefined = undefined;
		for (const number of numbers) {
			for (const board of boards) {
				if (board.won) {
					continue;
				}
				board.markNumber(number);
				if (board.isWinning()) {
					lastWinner = board;
				}
			}
		}
		return lastWinner;
	}

	static parse(input: string): { boards: Bingo[]; numbers: number[] } {
		const [numbersSegment, ...boardSegments] = input.split('\n\n');
		const numbers = numbersSegment!.splitToInt({ delimiter: /,/ });
		const boards = boardSegments
			.map((boardSegment) => boardSegment.lines().map((line) => line.splitToInt()))
			.map((board) => new Bingo(board));
		return { numbers, boards };
	}
}
