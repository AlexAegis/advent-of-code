import type { GridWorld } from '../world/grid-world.class.js';

export const addTickerSystem = (world: GridWorld) =>
	world.addSystem((world) =>
		console.log(
			'tick:',
			world.tickcount,
			'dt:',
			world.lastDeltaTime.toFixed(2),
			't:',
			world.time.toFixed(2),
			'frametime:',
			world.lastFrameTime.toFixed(2)
		)
	);
