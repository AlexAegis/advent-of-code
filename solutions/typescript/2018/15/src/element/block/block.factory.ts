import type { Block } from './block.class.js';
import { Ground } from './ground.class.js';
import { Wall } from './wall.class.js';

export const blockRepresentations: { [r: string]: () => Block } = {
	'#': () => new Wall(),
	'.': () => new Ground(),
};
export const blockFactory = (cave: string): Block => {
	const blockRepresentation = blockRepresentations[cave];
	if (blockRepresentation) {
		return blockRepresentation();
	} else {
		throw new Error(`No block representation for ${cave}`);
	}
};
