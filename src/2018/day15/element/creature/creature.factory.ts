import { Goblin } from './goblin.class';
import { Elf } from './elf.class';
import { Creature } from './creature.class';

export const creatureRepresentations: { [r: string]: () => Creature } = { G: () => new Goblin(), E: () => new Elf() };
export const creatureFactory = (creature: string) => creatureRepresentations[creature]();
