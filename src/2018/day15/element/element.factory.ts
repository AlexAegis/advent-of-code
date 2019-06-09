import { blockRepresentations } from './block/block.factory';
import { creatureRepresentations } from './creature/creature.factory';
import { Element } from './element.class';

export const elementRepresentations: { [r: string]: () => Element } = Object.assign(
	{},
	blockRepresentations,
	creatureRepresentations
);
export const elementFactory = (element: string) => elementRepresentations[element]();
