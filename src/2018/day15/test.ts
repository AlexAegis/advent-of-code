import { elementFactory } from './element/element.factory';
import { Goblin } from './element/creature/goblin.class';
import { Wall } from './element/block/wall.class';

console.log(elementFactory('G') instanceof Goblin);

console.log(elementFactory('#') instanceof Wall);
