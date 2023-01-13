import { arrayDiff, BoundingBox, Vec2, Vec2Like, Vec2String } from '@alexaegis/advent-of-code-lib';
import type { Entity, EntityId } from '../entity/entity.class.js';
import type { GridWorld } from './grid-world.class.js';

export class SpatialCache {
	/**
	 * A fast lookup for entities at given positions, entities covering
	 * infinite area are not stored here
	 */
	readonly positionTable = new Map<Vec2String, Entity[]>();
	/**
	 * A collection of entities covering infinite areas, used sparingly
	 */
	readonly infiniteBoxes = new Map<EntityId, BoundingBox[]>();

	constructor(private readonly world: GridWorld) {}

	get(position: Vec2Like): Entity[] {
		const fromTable = this.positionTable.get(Vec2.toString(position)) ?? [];
		const fromInfiniteBoxes = [...this.infiniteBoxes.entries()]
			.filter(([, boxes]) => boxes.some((box) => box.contains(position)))
			.map(([entityId]) => this.world.entities.get(entityId)!);

		return fromTable.concat(fromInfiniteBoxes);
	}

	move(entity: Entity, from: Vec2String[], to: Vec2String[]): void {
		// Infinite boxes are not indexed
		const { onlyInFirst, onlyInSecond } = arrayDiff(from, to);

		for (const noLongerAt of onlyInFirst) {
			const entitiesThere = this.positionTable.get(noLongerAt);
			if (entitiesThere) {
				const next = entitiesThere.filter((entityThere) => entityThere !== entity);
				if (next.length) {
					this.positionTable.set(noLongerAt, next);
				} else {
					this.positionTable.delete(noLongerAt);
				}
			}
		}

		for (const nowAt of onlyInSecond) {
			const entitiesThere = this.positionTable.get(nowAt) ?? [];
			entitiesThere.push(entity);
			this.positionTable.set(nowAt, entitiesThere);
		}
	}

	areaOfAllNonInfiniteEntities(): BoundingBox {
		return BoundingBox.fromVectors(this.positionTable.keyArray().map((v) => new Vec2(v)));
	}
}
