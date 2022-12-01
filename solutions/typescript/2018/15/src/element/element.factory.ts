import { blockRepresentations } from './block/block.factory.js';
import { creatureRepresentations } from './creature/creature.factory.js';
import type { Element } from './element.class.js';

export const elementRepresentations: { [r: string]: () => Element } = Object.assign(
	{},
	blockRepresentations,
	creatureRepresentations
);
export const elementFactory = (element: string): Element => elementRepresentations[element]();
