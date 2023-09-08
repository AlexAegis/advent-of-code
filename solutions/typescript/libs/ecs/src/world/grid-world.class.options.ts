import type { Defined } from '@alexaegis/common';
import type { CameraOptions } from '../components/prebuilt/camera.component.options.js';
import type { ExecutorHaltConditionType, ExecutorType } from '../executor/executor.class.js';
import type { IOBackendType, RendererSystemOptions } from '../renderer/index.js';
export interface GridWorldOptions {
	/**
	 * @default undefined
	 */
	io?: IOBackendType | undefined;
	/**
	 * @default 60
	 */
	executorSpeed?: ExecutorType | undefined;

	/**
	 * @default 'untilSettled'
	 */
	executorHaltCondition?: ExecutorHaltConditionType | undefined;

	/**
	 * Additional renderer options
	 */
	rendererOptions?: Omit<RendererSystemOptions, 'cameraEntity' | 'backend'> | undefined;

	cameraOptions?: Omit<CameraOptions, 'entity'> | undefined;
}

export type NormalizedGridWorldOptions = Defined<Omit<GridWorldOptions, 'io' | 'cameraOptions'>> &
	GridWorldOptions;

export const normalizeGridWorldOptions = (
	options?: GridWorldOptions,
): NormalizedGridWorldOptions => {
	return {
		io: options?.io,
		executorSpeed: options?.executorSpeed ?? 60,
		executorHaltCondition: options?.executorHaltCondition ?? 'untilSettled',
		rendererOptions: {
			renderColliders: options?.rendererOptions?.renderColliders ?? false,
		},
		cameraOptions: options?.cameraOptions,
	};
};
