import { CameraComponent, GridWorld } from '../../index.js';

export const addCameraFollowSystem = (gridWorld: GridWorld): void => {
	gridWorld.addSystem((world) => {
		const camera = world.query(CameraComponent)[0]?.[1];
		// IO-less worlds have no camera
		if (!camera) {
			return;
		}

		const entityPosition = camera.options.entity?.getCenterPosition();

		// If there's no entity to follow or it doesn't have a position
		if (!entityPosition) {
			return;
		}

		const paddedWorldViewport = camera.worldViewport.clone();

		if (camera.options.followArea?.marginRatio !== undefined) {
			const marginRatio = camera.options.followArea.marginRatio;
			const horizontalMargin = Math.floor(
				paddedWorldViewport.horizontal.length / marginRatio
			);
			const verticalMargin = Math.floor(paddedWorldViewport.vertical.length / marginRatio);

			if (camera.options.followArea?.kind === 'responsive') {
				paddedWorldViewport.pad(-horizontalMargin, -verticalMargin);
			} else if (camera.options.followArea?.kind === 'responsiveSquare') {
				paddedWorldViewport.pad(-Math.min(horizontalMargin, verticalMargin));
			} else {
				// Or use it as a flat value and not as a ratio
				paddedWorldViewport.pad(-marginRatio);
			}
		}

		if (camera.options.followMode === 'focus') {
			camera.centerOn(entityPosition);
		} else if (!paddedWorldViewport.contains(entityPosition)) {
			if (camera.options.followMode === 'edge') {
				const maxEdge = paddedWorldViewport.clampInto(entityPosition);
				const offset = entityPosition.sub(maxEdge);
				camera.move(offset);
			} else if (camera.options.followMode === 'jump') {
				const maxEdge = paddedWorldViewport.clampInto(entityPosition);
				camera.centerOn(maxEdge);
			}
		}
	});
};
