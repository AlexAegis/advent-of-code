import { Coord } from './model/coord.class';
import { Rail } from './model/rail.type';
import { DirectionMarker } from './model/direction-marker.type';
import { Direction } from './model/direction.class';
import { Mine } from './model/mine.class';
import { Cart } from './model/cart.class';
import { split } from '@root';

export const interpreter = (input: string): Mine => {
	const mine: Mine = new Mine();
	let row: number = 0;
	for (const line of split(input)) {
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
	}
	mine.height = row;
	return mine;
};
