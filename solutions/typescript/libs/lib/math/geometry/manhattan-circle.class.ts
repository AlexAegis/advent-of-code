import { Interval, Vec2Like } from '../../index.js';
import { Vec2 } from '../../model/vector/vec2.class.js';

export class ManhattanCircle {
	constructor(public center: Vec2, public radius: number) {}

	contains(point: Vec2Like): boolean {
		return this.center.manhattan(point) <= this.radius;
	}

	vertices(): Vec2[] {
		if (this.radius === 0) {
			return [this.center];
		} else {
			return [
				new Vec2(this.center.x - this.radius, this.center.y), // left
				new Vec2(this.center.x + this.radius, this.center.y), // right
				new Vec2(this.center.x, this.center.y + this.radius), // top
				new Vec2(this.center.x, this.center.y - this.radius), // bottom
			];
		}
	}

	intersect(other: ManhattanCircle): [Vec2, Vec2] | undefined {
		return ManhattanCircle.intersect(this, other);
	}

	/**
	 * The 'range' of S is 3 in manhattan distance. The effective range at point 'e'
	 * is then 1, because from 'e', at most at 1 manhattan distance is every point
	 * covered by the range of S.
	 *
	 * ...#....
	 * ..###...
	 * .#####..
	 * ###S###.
	 * .###e#..
	 * ..###...
	 * ...#..f.
	 *
	 * Similarly the effective range of S at f is 0 because it's outside the range
	 * of S
	 */
	getEffectiveRange(pos: Vec2Like): number {
		return Math.max(this.radius - this.center.manhattan(pos), 0);
	}

	spanAtY(y: number): Interval {
		const effectiveRange = this.getEffectiveRange({
			x: this.center.x,
			y,
		});
		return new Interval(this.center.x - effectiveRange, this.center.x + effectiveRange);
	}

	/**
	 * Returns two points so that both points satisfy
	 * result.center.manhattan(a) === a.radius && result.center.manhattan(b) === b.radius
	 *
	 * If two manhattan circles intersect they have exactly one of their points inside the other
	 * this defines a rectangle, and their opposite ends distance is the same as the other opposing ends
	 * so the distance between the two points that are inside the other, is the same as the distance of the intersections
	 *
	 * taking the half of that,
	 */
	static intersect(a: ManhattanCircle, b: ManhattanCircle): [Vec2, Vec2] | undefined {
		const verticesOfAInsideB = a.vertices().filter((vertex) => b.contains(vertex));
		const verticesOfBInsideA = b.vertices().filter((vertex) => a.contains(vertex));

		if (verticesOfAInsideB.length !== 1 || verticesOfBInsideA.length !== 1) {
			// Either there are "infinite" or 0 intersecting points
			return undefined;
		} else {
			const vertexOfAInsideB = verticesOfAInsideB[0];
			const vertexOfBInsideA = verticesOfBInsideA[0];

			// This distance is the same as between the intersecting points!
			const d = vertexOfAInsideB.manhattan(vertexOfBInsideA);

			const hd = d / 2;

			const y1 = vertexOfAInsideB.y + hd;
			const y2 = vertexOfBInsideA.y - hd;

			const x1 = vertexOfAInsideB.x - hd;
			const x2 = vertexOfBInsideA.x + hd;

			return [new Vec2(x1, y1), new Vec2(x2, y2)];
		}
	}

	static *walkIntersections(
		circles: ManhattanCircle[],
		onlyIntegerIntersections = true
	): Generator<Vec2> {
		const gen = circles.walkPairs();

		for (const [a, b] of gen) {
			const i0 = a.intersect(b);

			if (i0) {
				for (const v of i0) {
					if (!onlyIntegerIntersections || v.isInt()) {
						yield v;
					}
				}
			}

			// TODO: Because of a bug, intersect is not the same backwards..
			const i1 = b.intersect(a);

			if (i1) {
				for (const v of i1) {
					if (!onlyIntegerIntersections || v.isInt()) {
						yield v;
					}
				}
			}
		}
	}

	static *walkEdges(sensorData: ManhattanCircle[]): Generator<Vec2> {
		for (const data of sensorData) {
			yield* data.center.generateVectorsAroundInManhattanRadius(data.radius + 1);
		}
	}

	clone(): ManhattanCircle {
		return new ManhattanCircle(this.center.clone(), this.radius);
	}

	setRadius(radius: number): ManhattanCircle {
		this.radius = radius;
		return this;
	}
}
