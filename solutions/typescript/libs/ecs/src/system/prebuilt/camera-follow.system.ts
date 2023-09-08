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

		let horizontalMargin = 0;
		let verticalMargin = 0;

		if (camera.options.followArea?.marginRatio !== undefined) {
			const marginRatio = camera.options.followArea.marginRatio;
			horizontalMargin = Math.floor(paddedWorldViewport.horizontal.length / marginRatio);
			verticalMargin = Math.floor(paddedWorldViewport.vertical.length / marginRatio);

			if (camera.options.followArea.kind === 'responsive') {
				paddedWorldViewport.pad(-horizontalMargin, -verticalMargin);
			} else if (camera.options.followArea.kind === 'responsiveSquare') {
				paddedWorldViewport.pad(-Math.min(horizontalMargin, verticalMargin));
			} else {
				// Or use it as a flat value and not as a ratio
				paddedWorldViewport.pad(-marginRatio);
			}
		}

		if (camera.options.followMode === 'focus') {
			camera.centerOn(entityPosition);
		} else if (!paddedWorldViewport.contains(entityPosition)) {
			const maxEdge = paddedWorldViewport.clampInto(entityPosition);
			const offset = entityPosition.sub(maxEdge);

			switch (camera.options.followMode) {
				case 'edge': {
					camera.move(offset);

					break;
				}
				case 'jumpToCenter': {
					const horizontalJump = Math.floor(paddedWorldViewport.width / 2);
					const verticalJump = Math.floor(paddedWorldViewport.height / 2);

					if (entityPosition.x !== maxEdge.x) {
						offset.x = offset.x < 0 ? -horizontalJump : horizontalJump;
					}
					if (entityPosition.y !== maxEdge.y) {
						offset.y = offset.y < 0 ? -verticalJump : verticalJump;
					}
					camera.move(offset);

					break;
				}
				case 'jump': {
					if (entityPosition.x !== maxEdge.x) {
						offset.x = offset.x < 0 ? -horizontalMargin : horizontalMargin;
					}
					if (entityPosition.y !== maxEdge.y) {
						offset.y = offset.y < 0 ? -verticalMargin : verticalMargin;
					}
					camera.move(offset);

					break;
				}
				// No default
			}
		}

		return undefined;
	});
};
