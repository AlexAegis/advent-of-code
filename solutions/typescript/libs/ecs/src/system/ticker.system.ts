import type { GridWorld } from '../world/grid-world.class.js';

export const addTickerSystem = (world: GridWorld) => {
	world.addSystem((world) => {
		console.log(
			'tick:',
			world.timeData.tick,
			'dt:',
			world.timeData.deltaTime.toFixed(2),
			't:',
			world.timeData.time.toFixed(2),
			'frametime:',
			world.lastFrameTime.toFixed(2),
		);

		return false;
	});
};
