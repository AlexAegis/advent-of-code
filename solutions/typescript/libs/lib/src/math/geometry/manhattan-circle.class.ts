import { Interval, type Vec2Like } from '../../index.js';
import { Vec2 } from '../../model/vector/vec2.class.js';

export class ManhattanCircle {
	constructor(
		public center: Vec2,
		public radius: number,
	) {}

	contains(point: Vec2Like): boolean {
		return this.center.manhattan(point) <= this.radius;
	}

	isOnEdge(point: Vec2Like): boolean {
		return this.center.manhattan(point) === this.radius;
	}

	vertices(): Vec2[] {
		return this.radius === 0
			? [this.center]
			: [
					new Vec2(this.center.x - this.radius, this.center.y), // left
					new Vec2(this.center.x + this.radius, this.center.y), // right
					new Vec2(this.center.x, this.center.y + this.radius), // top
					new Vec2(this.center.x, this.center.y - this.radius), // bottom
			  ];
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
		return Math.max(this.radius - this.center.manhattan(pos), -1);
	}

	rowAt(y: number): Interval {
		const effectiveRange = this.getEffectiveRange({
			x: this.center.x,
			y,
		});
		return effectiveRange >= 0
			? Interval.closed(this.center.x - effectiveRange, this.center.x + effectiveRange)
			: Interval.open(this.center.x, this.center.x);
	}

	heightAt(x: number): Interval {
		const effectiveRange = this.getEffectiveRange({
			x,
			y: this.center.y,
		});
		return effectiveRange >= 0
			? Interval.closed(this.center.y - effectiveRange, this.center.y + effectiveRange)
			: Interval.open(this.center.y, this.center.y);
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
	static intersect(ac: ManhattanCircle, bc: ManhattanCircle): [Vec2, Vec2] | undefined {
		const verticesOfAInsideB = ac.vertices().filter((vertex) => bc.contains(vertex));
		const verticesOfBInsideA = bc.vertices().filter((vertex) => ac.contains(vertex));
		const verticesInsideEachother = [...verticesOfAInsideB, ...verticesOfBInsideA];

		if (verticesInsideEachother.length === 2) {
			const [av, bv] = verticesInsideEachother as [Vec2, Vec2];

			// This distance is the same as between the intersecting points!
			const d = av.manhattan(bv);

			const areFromTheSameCircle =
				verticesOfAInsideB.length === 2 || verticesOfBInsideA.length === 2;
			const halver = areFromTheSameCircle ? 4 : 2;
			const hd = d / halver;

			const y1 = av.y + hd;
			const y2 = av.y - hd;
			const y3 = bv.y + hd;
			const y4 = bv.y - hd;

			const x1 = av.x - hd;
			const x2 = av.x + hd;
			const x3 = bv.x - hd;
			const x4 = bv.x + hd;

			// A "bit" brute-forcey
			return [
				new Vec2(x1, y1),
				// new Vec2(x1, y2),
				// new Vec2(x1, y3),
				// new Vec2(x1, y4),
				new Vec2(x2, y1),
				new Vec2(x2, y2),
				// new Vec2(x2, y3),
				// new Vec2(x2, y4),
				// new Vec2(x3, y1),
				// new Vec2(x3, y2),
				new Vec2(x3, y3),
				new Vec2(x3, y4),
				// new Vec2(x4, y1),
				new Vec2(x4, y2),
				// new Vec2(x4, y3),
				new Vec2(x4, y4),
			]
				.filter((v) => ac.isOnEdge(v) && bc.isOnEdge(v))
				.reduce<Vec2[]>((a, n) => {
					if (!a.some((v) => v.equals(n))) {
						a.push(n);
					}
					return a;
				}, []) as [Vec2, Vec2];
		} else {
			// Either there are "infinite" or 0 intersecting points
			return undefined;
		}
	}

	static *walkIntersections(
		circles: ManhattanCircle[],
		onlyIntegerIntersections = true,
	): Generator<Vec2> {
		for (const [a, b] of circles.walkPairs()) {
			const intersecion = a.intersect(b);

			if (intersecion) {
				for (const v of intersecion) {
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

	setRadius(radius: number): this {
		this.radius = radius;
		return this;
	}
}
