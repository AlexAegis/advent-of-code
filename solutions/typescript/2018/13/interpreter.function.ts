import { split } from '@lib';
import { Direction, isDirectionArrowSymbol, Vec2 } from '@lib/model';
import { Cart, Mine, Rail } from './model';

export const interpreter = (input: string): Mine => {
	const mine: Mine = new Mine();
	const rows = split(input);
	mine.height = rows.length;
	let row = 0;
	for (const line of rows) {
		if (!mine.width) {
			mine.width = line.length;
		}
		[...line].forEach((letter, column) => {
			if (isDirectionArrowSymbol(letter)) {
				mine.carts.push(new Cart(new Vec2(column, row), letter));
				// If it's a minecart, also put a rail under it
				if (Direction.isHorizonal(letter)) {
					letter = '-';
				} else if (Direction.isVertical(letter)) {
					letter = '|';
				}
			}
			if (letter !== ' ') {
				mine.rail.set(new Vec2(column, row).toString(), letter as Rail);
			}
		});
		row++;
	}

	return mine;
};
