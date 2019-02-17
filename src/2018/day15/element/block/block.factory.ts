import { Block } from './block.class';
import { Wall } from './wall.class';
import { Ground } from './ground.class';

export const blockRepresentations: { [r: string]: () => Block } = { '#': () => new Wall(), '.': () => new Ground() };
export const blockFactory = (cave: string) => blockRepresentations[cave]();
