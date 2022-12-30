import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { AsciiDisplayComponent } from '../../components/prebuilt/ascii-display.component.js';
import { StaticPositionComponent } from '../../components/prebuilt/position.component.js';
import type { GridWorld } from '../../index.js';
import type { Entity } from '../entity.class.js';

export const spawnCompass = (world: GridWorld): Entity =>
	world.spawn(
		new StaticPositionComponent(new Vec2(-2, -1), -Infinity),
		AsciiDisplayComponent.fromString(`\
 -Y
-X╳+X
 +Y`)
	);
