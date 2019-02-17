import { Element } from './element.class';
import { creatureRepresentations } from './creature/creature.factory';
import { blockRepresentations } from './block/block.factory';

export const elementRepresentations: { [r: string]: () => Element } = Object.assign(
	{},
	blockRepresentations,
	creatureRepresentations
);
export const elementFactory = (element: string) => elementRepresentations[element]();
