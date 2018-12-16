import { createReadStream } from 'fs';
import * as rl from 'readline';
import { interval, Subject } from 'rxjs';
import { flatMap, tap, takeWhile } from 'rxjs/operators';

export const railCounterReg: RegExp = /\/|\\|-|\||\+|>|<|v|\^/;

export type Rail = ('/' | '\\' | '-' | '|' | '+') & string;
export type DirectionMarker = ('^' | '>' | 'v' | '<') & string;

export class Coord {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	add(coord: Coord) {
		this.x += coord.x;
		this.y -= coord.y; // Psst, you didn't see me.
		return this;
	}

	toString(): string {
		return `${this.x},${this.y}`;
	}
}

export class Direction {
	marker: DirectionMarker;
	value: Coord;

	constructor(marker: DirectionMarker) {
		this.marker = marker;
		this.value = Direction.markerAssociations[this.marker];
	}

	calculateTurn(x: -1 | 1 = 1, y: -1 | 1 = 1) {
		this.value = new Coord(x * this.value.y, y * this.value.x);
		switch (this.value.toString()) {
			case '1,0':
				this.marker = '>';
				break;
			case '0,-1':
				this.marker = 'v';
				break;
			case '-1,0':
				this.marker = '<';
				break;
			case '0,1':
				this.marker = '^';
				break;
		}
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
	crashes: Array<Coord> = [];
	height: number;
	width: number;
	print(tick: number = undefined): void {
		console.log(`${tick}.`);
		for (let y = 0; y < this.height; y++) {
			let line: string = '';
			for (let x = 0; x < this.width; x++) {
				const coord: Coord = new Coord(x, y);
				const rail = this.rail.get(coord.toString());
				const carts: Array<Cart> = this.carts.filter(cart => cart.position.toString() === coord.toString());
				const crashes: Array<Coord> = this.crashes.filter(c => c.toString() === coord.toString());
				if (carts.length > 1 || crashes.length > 1) {
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
		const crashing = mine.carts.filter(cart => cart.position.toString() === this.position.toString());
		if (crashing.length > 1) {
			mine.carts = mine.carts.filter(cart => cart.position.toString() !== this.position.toString());
		}
		return crashing.length > 1;
	}
}

export const read = (input: 'example' | 'example_two' | 'input' = 'example_two'): Promise<Mine> =>
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

export const run = async (input: 'example' | 'example_two' | 'input' = 'example_two'): Promise<Coord> =>
	new Promise<Coord>(async res => {
		console.time();
		const mine: Mine = await read(input);
		const crash = new Subject<Coord>();
		interval()
			.pipe(
				takeWhile(tick => mine.carts.length > 1),
				tap(tick => (input !== 'input' ? mine.print(tick) : undefined)),
				flatMap(tick =>
					mine.carts.sort((a, b) =>
						a.position.y === b.position.y ? a.position.x - b.position.x : a.position.y - b.position.y
					)
				)
			)
			.subscribe(cart => cart.step(mine, crash))
			.add(() => {
				input !== 'input' ? mine.print(0) : undefined;
				res(mine.carts[0].position);
				console.timeEnd();
			});
		crash.pipe(takeWhile(tick => mine.carts.length > 1)).subscribe(coord => {
			mine.crashes.push(coord);
			console.log(`Crash happened on: ${coord}`);
		});
	});

// (async () => console.log(`Final survivors position is ${await run('example_two')}`))(); // 36,123
