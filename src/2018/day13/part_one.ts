import { createReadStream } from 'fs';
import * as rl from 'readline';
import { interval, Subject } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';

export const railCounterReg: RegExp = /\/|\\|-|\||\+|>|<|v|\^/;

export type Rail = ('/' | '\\' | '-' | '|' | '+') & string;
export type DirectionMarker = ('^' | '>' | 'v' | '<') & string;
export type Explosion = 'X';

export class Coord {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(coord: Coord) {
		this.x += coord.x;
		this.y -= coord.y;
		return this;
	}
	/**
	 * (0, 1) -> (1, 0) -> (0, -1) -> (-1, 0)
	 * @param coord
	 */
	static turnRight(coord: Coord) {
		return { x: coord.y, y: -coord.x };
	}

	static turnLeft(coord: Coord) {
		return { x: -coord.y, y: coord.x };
	}

	toString(): string {
		return `${this.x}_${this.y}`;
	}
}

export class Direction {
	marker: DirectionMarker;
	value: Coord; // up: (0, 1)  | right: (1, 0) | down: (0, -1) | left: (-1, 0)

	constructor(marker: DirectionMarker) {
		this.marker = marker;
		this.value = Direction.markerAssociations[this.marker];
	}

	calculateTurn(x: -1 | 1 = 1, y: -1 | 1 = 1) {
		const temp = this.value.x;
		this.value.x = x * this.value.y;
		this.value.y = y * temp;
		switch (this.value.toString()) {
			case '1_0':
				this.marker = '>';
				break;
			case '0_-1':
				this.marker = 'v';
				break;
			case '-1_0':
				this.marker = '<';
				break;
			case '0_1':
				this.marker = '^';
				break;
		}
		/* 
		this.marker = <DirectionMarker>(
			Object.keys(Direction.markerAssociations).find(
				key => Direction.markerAssociations[key].toString() === this.value.toString()
			)
		);*/
		console.log(`for ${this.value.toString()} it's: ${this.marker}`);
	}

	turnLeft() {
		this.calculateTurn(-1);
	}

	turnRight() {
		this.calculateTurn(undefined, -1);
	}

	static directions: Array<string> = ['^', 'v', '>', '<'];

	static isHorizonal(marker: DirectionMarker): boolean {
		return marker === '>' || marker === '<';
	}

	static isVertical(marker: DirectionMarker): boolean {
		return marker === '^' || marker === 'v';
	}

	static markerAssociations: { [key: string]: Coord } = {
		'^': new Coord(0, 1),
		'>': new Coord(1, 0),
		v: new Coord(0, -1),
		'<': new Coord(-1, 0)
	};

	turn(next: Rail) {
		if (Direction.isVertical(this.marker)) {
			if (next === '\\') {
				this.turnLeft();
			} else if (next === '/') {
				this.turnRight();
			}
		} else if (Direction.isHorizonal(this.marker)) {
			if (next === '\\') {
				this.turnRight();
			} else if (next === '/') {
				this.turnLeft();
			}
		}
	}
}

export class Mine {
	rail: Map<string, Rail> = new Map();
	carts: Array<Cart> = [];
	height: number;
	width: number;
	print(): void {
		for (let x = 0; x < this.height; x++) {
			let line: string = '';
			for (let y = 0; y < this.width; y++) {
				const coord: Coord = new Coord(y, x);
				const rail = this.rail.get(coord.toString());
				const carts: Array<Cart> = this.carts.filter(cart => cart.position.toString() === coord.toString());
				if (carts.length > 1) {
					line += 'X';
				} else if (carts.length === 1) {
					line += carts[0].direction.marker;
				} else if (rail) {
					line += rail;
				} else {
					line += ' ';
				}
			}
			console.log(line);
		}
	}
}

export class Cart {
	position: Coord;
	direction: Direction;
	turnsAtIntersection: number = 0;
	constructor(position: Coord, directionMarker: DirectionMarker) {
		this.position = position;
		this.direction = new Direction(directionMarker);
	}

	/**
	 * A step of a minecart always steps forward.
	 * After stepped forward, the minecart will turn if possible.
	 */
	step(mine: Mine, crash: Subject<Coord>): void {
		this.position = this.position.add(this.direction.value);
		const rail = mine.rail.get(this.position.toString());
		if (rail === '+') {
			switch (this.turnsAtIntersection % 3) {
				case 0:
					this.direction.turnLeft();
					break;
				case 2:
					this.direction.turnRight();
					break;
			}
			this.turnsAtIntersection++;
		} else {
			this.direction.turn(rail);
		}
		if (this.isCrashed(mine)) {
			crash.next(this.position);
		}
	}

	isCrashed(mine: Mine): boolean {
		return mine.carts.filter(cart => cart.position.toString() === this.position.toString()).length > 1;
	}
}

export const read = (input: 'example' | 'input' = 'example'): Promise<Mine> =>
	new Promise<Mine>(res => {
		const mine: Mine = new Mine();
		let row: number = 0;
		rl.createInterface({
			input: createReadStream(`src/2018/day13/${input}.txt`)
		})
			.on('line', line => {
				if (!mine.width) {
					mine.width = line.length;
				}
				[...line].forEach((letter, column) => {
					if (Direction.directions.find(direction => direction === letter) !== undefined) {
						mine.carts.push(new Cart(new Coord(column, row), <DirectionMarker>letter));
						if (Direction.isHorizonal(<DirectionMarker>letter)) {
							letter = '-';
						} else if (Direction.isVertical(<DirectionMarker>letter)) {
							letter = '|';
						}
					}
					if (letter !== ' ') {
						mine.rail.set(new Coord(column, row).toString(), <Rail>letter);
					}
				});
				row++;
			})
			.on('close', () => (mine.height = row) && res(mine));
	});

export const run = async (input: 'example' | 'input' = 'example') => {
	console.time();
	const mine: Mine = await read(input);
	mine.print();
	const crash = new Subject<Coord>();
	interval()
		.pipe(takeUntil(crash))
		.subscribe(tick => {
			mine.carts
				.sort((a, b) =>
					a.position.y === b.position.y ? a.position.x - b.position.x : a.position.y - b.position.y
				)
				.forEach(cart => cart.step(mine, crash));
			mine.print();
		});
	crash.pipe(take(1)).subscribe(coord => {
		console.log(`First crash happened at ${coord}`);
		console.timeEnd();
	});
};

run();
