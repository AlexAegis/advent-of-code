import { blockRepresentations } from './block/block.factory.js';
import { creatureRepresentations } from './creature/creature.factory.js';
import type { Element } from './element.class.js';

export const elementRepresentations: Record<string, () => Element> = Object.assign(
	{},
	blockRepresentations,
	creatureRepresentations,
);
export const elementFactory = (element: string): Element => {
	const representation = elementRepresentations[element];
	if (!representation) {
		throw new Error(`No element representation for ${element}`);
	}
	return representation();
};
