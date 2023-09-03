import type { Creature } from './creature.class.js';
import { Elf } from './elf.class.js';
import { Goblin } from './goblin.class.js';

export const creatureRepresentations: Record<string, () => Creature> = {
	G: () => new Goblin(),
	E: () => new Elf(),
};
export const creatureFactory = (creature: string): Creature => {
	const represantion = creatureRepresentations[creature];
	if (!represantion) {
		throw new Error(`No representation for ${creature}`);
	}
	return represantion();
};
