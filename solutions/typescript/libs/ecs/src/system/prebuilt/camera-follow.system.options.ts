import type { Entity } from '../../entity/entity.class.js';

export type CameraFollowMode = 'jump' | 'jumpToCenter' | 'edge' | 'focus';
export type CameraFollowAreaKind = 'responsive' | 'responsiveSquare' | 'fixedSquare';

export interface CameraFollowAreaOptions {
	/**
	 * Defines how the follow areas size is
	 */
	kind?: CameraFollowAreaKind;
	marginRatio?: number;
}

export interface CameraFollowSystemOptions {
	entity?: Entity;
	followMode?: CameraFollowMode;
	/**
	 * Defines an area in the center of the viewport, only used with 'jump'
	 * and 'edge' follow-modes.
	 */
	followArea?: CameraFollowAreaOptions;
}
