import { Block } from './block.class';
import { Ground } from './ground.class';
import { Wall } from './wall.class';

export const blockRepresentations: { [r: string]: () => Block } = {
	'#': () => new Wall(),
	'.': () => new Ground(),
};
export const blockFactory = (cave: string): Block => blockRepresentations[cave]();
