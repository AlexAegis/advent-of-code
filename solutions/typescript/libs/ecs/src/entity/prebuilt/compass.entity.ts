import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../../components/prebuilt/ascii-display.component.js';
import { StaticPositionComponent } from '../../components/prebuilt/position.component.js';
import type { GridWorld } from '../../index.js';
import type { Entity } from '../entity.class.js';

const compassString = `\
 -Y
-X╳+X
 +Y`;

export const spawnCompass = (world: GridWorld): Entity => {
	const compassDisplayComponent = AsciiDisplayComponent.fromString(compassString);
	return world.spawn(
		new StaticPositionComponent(new Vec2(-2, -1), Number.NEGATIVE_INFINITY),
		compassDisplayComponent,
	);
};
