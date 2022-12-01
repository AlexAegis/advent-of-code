import type { Creature } from './creature.class.js';
import { Elf } from './elf.class.js';
import { Goblin } from './goblin.class.js';

export const creatureRepresentations: { [r: string]: () => Creature } = {
	G: () => new Goblin(),
	E: () => new Elf(),
};
export const creatureFactory = (creature: string): Creature => creatureRepresentations[creature]();
