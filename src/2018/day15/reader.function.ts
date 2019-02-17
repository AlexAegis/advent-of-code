import { Ground } from './element/block/ground.class';
import { createReadStream } from 'fs';
import * as rl from 'readline';
import { Cave } from './cave.class';
import { elementFactory } from './element/element.factory';
import { Element } from './element/element.class';
import { Creature } from './element/creature/creature.class';

export const reader = (input: string = 'input'): Promise<Cave> =>
	new Promise<Cave>(res => {
		const cave: Cave = new Cave();
		rl.createInterface({
			input: createReadStream(`src/2018/day15/${input}.txt`)
		})
			.on('line', line => {
				if (!cave.width) {
					cave.width = line.length;
				}
				[...line].forEach((letter, column) => {
					const element: Element = elementFactory(letter);
					if (element instanceof Creature) {
						const ground: Ground = <Ground>elementFactory('.');
						ground.occupant = element;
						cave.grid.push(ground);
					} else {
						cave.grid.push(element);
					}
				});
				cave.height++;
			})
			.on('close', () => res(cave));
	});
