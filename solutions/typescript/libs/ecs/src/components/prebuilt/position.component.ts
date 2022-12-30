import { arrayDiff, nonNullish, Vec2, Vec2Like, Vec2String } from '@alexaegis/advent-of-code-lib';
import type { Entity } from '../../index.js';
import type { GridWorld } from '../../world/grid-world.class.js';
import { Component } from '../component.class.js';
import { AsciiDisplayComponent } from './ascii-display.component.js';
import { CellColliderComponent } from './cell-collider.component.js';

export abstract class AnyPositionComponent extends Component {
	constructor(protected _position: Vec2, public readonly z = 0) {
		super();
	}

	override onSpawn(world: GridWorld): void {
		super.onSpawn(world);
		this.indexEntityMove(undefined, this.position);
	}

	get position(): Vec2 {
		return this._position;
	}

	static updateEntityPositionCache(
		entity: Entity,
		cache: Map<Vec2String, Entity[]>,
		oldPositions: Vec2String[],
		newPositions: Vec2String[]
	): void {
		const { onlyInFirst, onlyInSecond } = arrayDiff(oldPositions, newPositions);

		for (const noLongerAt of onlyInFirst) {
			const entitiesThere = cache.get(noLongerAt);
			if (entitiesThere) {
				const next = entitiesThere.filter((entityThere) => entityThere !== entity);
				if (next.length) {
					cache.set(noLongerAt, next);
				} else {
					cache.delete(noLongerAt);
				}
			}
		}

		for (const nowAt of onlyInSecond) {
			const entitiesThere = cache.get(nowAt) ?? [];
			entitiesThere.push(entity);

			cache.set(nowAt, entitiesThere);
		}
	}

	protected indexEntityMove(from: Vec2 | undefined, to: Vec2): void {
		for (const entity of this.belongsTo) {
			const display = entity.getComponent(AsciiDisplayComponent);
			if (display) {
				const previouslyVisibleAt = from
					? display.sprite.visibleAt.map((at) => at.add(from).toString())
					: [];
				const willBeVisibleAt = display.sprite.visibleAt.map((at) => at.add(to).toString());

				AnyPositionComponent.updateEntityPositionCache(
					entity,
					this.world.entitiesDisplayedAtPosition,
					previouslyVisibleAt,
					willBeVisibleAt
				);
			}

			const cellCollider = entity.getComponent(CellColliderComponent);
			if (cellCollider) {
				const previouslyCollidingAt = from
					? cellCollider.colliders.map((at) => at.add(from).toString())
					: [];
				const willBeCollidingAt = cellCollider.colliders.map((at) => at.add(to).toString());

				AnyPositionComponent.updateEntityPositionCache(
					entity,
					this.world.entitiesCollidingAtPosition,
					previouslyCollidingAt,
					willBeCollidingAt
				);
			}
		}
	}
}

export class PositionComponent extends AnyPositionComponent {
	private onMoveCallbacks: ((position: Readonly<Vec2>) => void)[] = [];

	moveTo(to: Vec2): boolean {
		return this.move(to.sub(this.position));
	}

	move(offset: Vec2Like): boolean {
		// Collision Check
		if (this.canMove(offset)) {
			const oldPosition = this.position.clone();
			this._position.addMut(offset);
			this.indexEntityMove(oldPosition, this.position);
			this.onMoveCallbacks.forEach((callback) => callback(this.position));
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Can only move if all the colliders ofattached entities are free to move.
	 */
	canMove(offset: Vec2Like): boolean {
		return this.belongsTo
			.map((entity) => entity.getComponent(CellColliderComponent))
			.filter(nonNullish)
			.flatMap((c) => c.colliders.map((p) => p.add(this.position).addMut(offset)))
			.every((p) => !this.world.entitiesCollidingAtPosition.get(p.toString())?.length);
	}

	onMove(callback: (position: Readonly<Vec2>) => void) {
		this.onMoveCallbacks.push(callback);
	}
}

/**
 * Signals that the entity it's attached to is immutable.
 * Components with this are always rendered first
 */
export class StaticPositionComponent extends AnyPositionComponent {}
