import { Creature } from './creature.class';
import { Elf } from './elf.class';
import { Goblin } from './goblin.class';

export const creatureRepresentations: { [r: string]: () => Creature } = { G: () => new Goblin(), E: () => new Elf() };
export const creatureFactory = (creature: string) => creatureRepresentations[creature]();
