import { createReadStream } from 'node:fs';
import * as rl from 'node:readline';
import { Cave } from './cave.class.js';
import type { Block } from './element/block/block.class.js';
import type { Ground } from './element/block/ground.class.js';
import { Creature } from './element/creature/creature.class.js';
import type { Element } from './element/element.class.js';
import { elementFactory } from './element/element.factory.js';

export const reader = (input = 'input'): Promise<Cave> =>
	new Promise<Cave>((res) => {
		const cave: Cave = new Cave();
		rl.createInterface({
			input: createReadStream(`src/2018/day15/${input}.txt`),
		})
			.on('line', (line) => {
				if (!cave.width) {
					cave.width = line.length;
				}
				for (const [, letter] of [...line].entries()) {
					const element: Element = elementFactory(letter);
					if (element instanceof Creature) {
						const ground: Ground = elementFactory('.') as Ground;
						ground.occupant = element;
						cave.grid.push(ground);
					} else {
						cave.grid.push(element as Block);
					}

					// wiring
				}
				cave.height++;
			})
			.on('close', () => {
				res(cave);
			});
	});
