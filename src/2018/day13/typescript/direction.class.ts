import { Coord } from './model/coord.class';
import { DirectionMarker } from './model/direction-marker.type';
import { Rail } from './rail.type';

export class Direction {
	value: Coord;

	constructor(public marker: DirectionMarker) {
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
