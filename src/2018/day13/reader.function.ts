import { createReadStream } from 'fs';
import * as rl from 'readline';
import { Coord } from './coord.class';
import { Rail } from './rail.type';
import { DirectionMarker } from './direction-marker.type';
import { Direction } from './direction.class';
import { Mine } from './mine.class';
import { Cart } from './cart.class';

export const reader = (input: 'example' | 'example_two' | 'input' = 'input'): Promise<Mine> =>
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
