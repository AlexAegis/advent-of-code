import {
	BoundingBox,
	mapGetOrSet,
	Vec2,
	type Constructor,
	type Vec2String,
} from '@alexaegis/advent-of-code-lib';
import type { GridWorld } from '../world/grid-world.class.js';
import { SpatialCache } from '../world/spatial-cache.class.js';
import { Component } from './component.class.js';

export abstract class SpatialComponent extends Component {
	/**
	 * The last area this component occupied based on the PositionComponent,
	 * used to calculate movement difference on move and is replaced after
	 * move.
	 */
	lastPositionsString?: Vec2String[];
	lastPositions?: Vec2[];

	abstract area(at: Vec2): BoundingBox[];

	getLastPositions(defaultPosition: Vec2): Vec2[];
	getLastPositions(defaultPosition?: Vec2): Vec2[] | undefined {
		if (this.lastPositions) {
			return this.lastPositions;
		} else if (defaultPosition) {
			const areas = this.area(defaultPosition);
			return areas
				.filter((area) => area.isFinite())
				.flatMap((area) => area.renderIntoVectors());
		} else {
			return undefined;
		}
	}

	getLastPositionsString(defaultPosition: Vec2): Vec2String[];
	getLastPositionsString(defaultPosition?: Vec2): Vec2String[] | undefined {
		if (this.lastPositionsString) {
			return this.lastPositionsString;
		} else if (defaultPosition) {
			return this.getLastPositions(defaultPosition).map((v) => v.toString());
		} else {
			return undefined;
		}
	}

	getBoundingBoxOfAll(): BoundingBox {
		return BoundingBox.fromVectors(
			this.getSpatialCache()
				.positionTable.keyArray()
				.map((v) => new Vec2(v)),
		);
	}

	getSpatialCache(): SpatialCache {
		return SpatialComponent.getSpatialCache(this.world, this.componentType());
	}

	static getSpatialCache(world: GridWorld, type: Constructor<Component>): SpatialCache {
		return mapGetOrSet(world.componentSpatialCache, type, () => new SpatialCache(world));
	}

	static isSpatialComponent(component: Component): component is SpatialComponent {
		return typeof (component as SpatialComponent).area === 'function';
	}
}
