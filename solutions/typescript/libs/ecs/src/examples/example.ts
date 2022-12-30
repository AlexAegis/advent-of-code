import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { spawnFloor, spawnWall } from '../entity/index.js';
import { spawnCompass } from '../entity/prebuilt/compass.entity.js';
import { spawnPlayer } from '../entity/prebuilt/player.entity.js';

import { GridWorld } from '../world/grid-world.class.js';

// TODO: add z level
// TODO: colors
const world = new GridWorld({
	io: 'terminalKit',
	executorHaltCondition: 'none',
	executorSpeed: 60,
});

spawnCompass(world);
spawnFloor(world, new Vec2(5, 3), { x: 6, y: 7 });
spawnWall(world, new Vec2(6, 0), new Vec2(5, 0));
spawnWall(world, new Vec2(7, 0), new Vec2(7, 8));

spawnPlayer(world, new Vec2(3, 3));

world.centerCameraOnEntities();
await world.run();
