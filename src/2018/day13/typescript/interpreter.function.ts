import { split } from '@lib';
import { Cart } from './model/cart.class';
import { Coord } from './model/coord.class';
import { DirectionMarker } from './model/direction-marker.type';
import { Direction } from './model/direction.class';
import { Mine } from './model/mine.class';
import { Rail } from './model/rail.type';

export const interpreter = (input: string): Mine => {
	const mine: Mine = new Mine();
	let row = 0;
	for (const line of split(input)) {
		if (!mine.width) {
			mine.width = line.length;
		}
		[...line].forEach((letter, column) => {
			if (Direction.directions.find(direction => direction === letter) !== undefined) {
				mine.carts.push(new Cart(new Coord(column, row), letter as DirectionMarker));
				if (Direction.isHorizonal(letter as DirectionMarker)) {
					letter = '-';
				} else if (Direction.isVertical(letter as DirectionMarker)) {
					letter = '|';
				}
			}
			if (letter !== ' ') {
				mine.rail.set(new Coord(column, row).toString(), letter as Rail);
			}
		});
		row++;
	}
	mine.height = row;
	return mine;
};
