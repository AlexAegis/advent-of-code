import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { spawnFloor, spawnWall } from '../entity/index.js';
import { spawnCompass } from '../entity/prebuilt/compass.entity.js';
import { spawnPlayer } from '../entity/prebuilt/player.entity.js';

import { GridWorld } from '../world/grid-world.class.js';

// TODO: add z level
const world = new GridWorld({
	io: 'terminalKit',
	executorHaltCondition: 'none',
	executorSpeed: 60,
	rendererOptions: {
		renderColliders: false,
	},
	cameraOptions: {
		movable: true,
		followArea: { kind: 'responsive', marginRatio: 6 },
		followMode: 'jump',
	},
});

spawnCompass(world);
spawnFloor(world, new Vec2(2, 3), { x: 3, y: 3 });
spawnWall(world, new Vec2(6, 0), new Vec2(5, 0));
spawnWall(world, new Vec2(7, 0), new Vec2(8, 8));

spawnWall(world, new Vec2(0, 0), new Vec2(0, Infinity));

const playerEntity = spawnPlayer(world, new Vec2(3, 3));

world.centerCameraOnEntities();
world.followWithCamera(playerEntity);

await world.run();
