import type { CameraFollowSystemOptions } from '../../system/prebuilt/camera-follow.system.options.js';

export interface CameraOptions extends CameraFollowSystemOptions {
	movable?: boolean | undefined;
}

export const normalizeCameraOptions = (rawOptions?: CameraOptions): CameraOptions => {
	return {
		movable: true,
		...rawOptions,
	};
};
