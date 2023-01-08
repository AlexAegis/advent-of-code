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
	executorSpeed?: ExecutorType;

	/**
	 * @default 'untilSettled'
	 */
	executorHaltCondition?: ExecutorHaltConditionType;

	/**
	 * Additional renderer options
	 */
	rendererOptions?: Omit<RendererSystemOptions, 'cameraEntity' | 'backend'>;

	cameraOptions?: Omit<CameraOptions, 'entity'>;
}

export type NormalizedGridWorldOptions = Required<Omit<GridWorldOptions, 'io' | 'cameraOptions'>> &
	GridWorldOptions;

export const normalizeGridWorldOptions = (
	options?: GridWorldOptions
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
