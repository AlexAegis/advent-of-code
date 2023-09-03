import { Vec2 } from '@alexaegis/advent-of-code-lib';
import { spawnFloor, spawnWall } from '../entity/index.js';
import { spawnCompass } from '../entity/prebuilt/compass.entity.js';
import { spawnPlayer } from '../entity/prebuilt/player.entity.js';

import { GridWorld } from '../world/grid-world.class.js';

// TODO: add z level
// TODO: add TUI, for logging and entity data displayers
// TODO: move GridECS out from Advent of Code
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
		followMode: 'jumpToCenter',
	},
});

const compassEntity = spawnCompass(world);
spawnFloor(world, new Vec2(3, 3), { x: 5, y: 5 });

spawnWall(world, new Vec2(6, 2), new Vec2(7, 2));
spawnWall(world, new Vec2(8, 2), new Vec2(9, 10));

spawnWall(world, new Vec2(0, 3), new Vec2(0, Number.POSITIVE_INFINITY));
spawnWall(world, new Vec2(3, 0), new Vec2(Number.POSITIVE_INFINITY, 0));

spawnWall(world, new Vec2(-3, 0), new Vec2(Number.NEGATIVE_INFINITY, 0));
spawnWall(world, new Vec2(0, -3), new Vec2(0, Number.NEGATIVE_INFINITY));

const playerEntity = spawnPlayer(world, new Vec2(1, 1));

world.centerCameraOnEntity(compassEntity);
world.followWithCamera(playerEntity);

await world.run();
