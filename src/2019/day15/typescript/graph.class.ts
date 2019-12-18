import { Direction, Vec2 } from '@lib/model';
import { Move, Status, statusToTile, Tile } from './meta';

export type PathSegment = [Move, Direction, GridGraphNode | undefined];
export class GridGraphNode {
	public north: GridGraphNode | undefined;
	public south: GridGraphNode | undefined;
	public west: GridGraphNode | undefined;
	public east: GridGraphNode | undefined;

	public deadend = false;
	public partOfPath = false;
	public constructor(public pos: Vec2, public tile: Tile) {}

	public children(except?: GridGraphNode): PathSegment[] {
		const res: PathSegment[] = [];

		if (!except || !this.north || !except.pos.equals(this.north.pos)) {
			res.push([Move.NORTH, Direction.NORTH, this.north]);
		}
		if (!except || !this.south || !except.pos.equals(this.south.pos)) {
			res.push([Move.SOUTH, Direction.SOUTH, this.south]);
		}
		if (
			!except ||
			!this.west ||
			!except.pos.equals(this.west.pos) //  && !this.west.deadend && !this.west.partOfPath
		) {
			res.push([Move.WEST, Direction.WEST, this.west]);
		}

		if (!except || !this.east || !except.pos.equals(this.east.pos)) {
			res.push([Move.EAST, Direction.EAST, this.east]);
		}

		return res;
	}
}

// tslint:disable-next-line: max-classes-per-file
export class GridGraph {
	public constructor() {}
	public limit = 40;

	public nodeCount = 1;

	public recSearch(
		path: GridGraphNode[],
		control: (dir: Direction) => Status,
		winCondition: (t?: Tile) => boolean
	): boolean {
		const current = path[path.length - 1];

		// console.log(path.map(p => '[' + p.pos.toString() + ']').join(', '));
		if (winCondition(current.tile)) {
			return true;
		}

		if (current.tile === Tile.WALL || current.partOfPath || current.deadend) {
			return false;
		}

		current.partOfPath = true;
		// try

		const possNexts = current.children(current) || [];
		console.log('possNexts', possNexts.length, possNexts);
		for (let [move, inDir, child] of possNexts) {
			console.log('MOVING', inDir.reverse('v').marker);
			// For every possible direction except the previous and deadends
			const stat = control(inDir);
			if (child === undefined) {
				// If we do now know it, explore

				switch (move) {
					case Move.NORTH:
						child = current.north = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
					case Move.EAST:
						child = current.east = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
					case Move.SOUTH:
						child = current.south = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
					case Move.WEST:
						child = current.west = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
				}
			}
			switch (move) {
				case Move.NORTH:
					child.south = current.north;
					break;
				case Move.EAST:
					child.west = current.east;
					break;
				case Move.SOUTH:
					child.north = current.south;
					break;
				case Move.WEST:
					child.east = current.west;
					break;
			}

			const res = this.recSearch([...path, child], control, winCondition);
			if (res) return res;
		}

		// backtrack;
		current.partOfPath = false;
		const last = path.pop();
		const befThat = path[path.length - 1];
		const backDir = last?.pos.sub(befThat.pos);
		console.log(last?.pos.toString(), befThat.pos.toString(), backDir?.toString());
		if (last) {
			last.deadend = true;
			if (last.tile !== Tile.WALL) {
				if (backDir) {
					control(backDir as Direction);
				}
			}
		}

		return false;
	}
	public search(
		previous: GridGraphNode,
		path: GridGraphNode[],
		control: (dir: Direction) => Status,
		winCondition: (t?: Tile) => boolean
	): [GridGraphNode[] | undefined, boolean] {
		console.log('PATH', path.length, path);
		const currentIndex = path.length - 1;
		const current = path[currentIndex];
		if (winCondition(current.tile)) {
			console.log('W!!!;!!!!!!!!!!!!! WIN');
			return [[...path, current], true];
		} else if (path.length >= this.limit) {
			return [undefined, false];
		} else if (path.slice(0, path.length - 2).find(p => p.pos === current.pos)) {
			console.log('BEEN THERE, RETURN');
			return [undefined, false];
		}

		let childrenExceptPrev = current.children(previous);
		childrenExceptPrev = childrenExceptPrev.filter(
			([_, __, cep]) => cep === undefined || path.find(p => cep.pos.equals(p.pos)) === undefined
		);
		// console.log('childrenExceptPrev: ', childrenExceptPrev);

		let res: GridGraphNode[] | undefined;
		if (childrenExceptPrev.length === 0) {
			current.deadend = true;
		}
		for (let [move, inDir, child] of childrenExceptPrev || []) {
			// For every possible direction except the previous and deadends
			const stat = control(inDir);
			if (child === undefined) {
				// If we do now know it, explore

				switch (move) {
					case Move.NORTH:
						child = current.north = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
					case Move.EAST:
						child = current.east = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
					case Move.SOUTH:
						child = current.south = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
					case Move.WEST:
						child = current.west = new GridGraphNode(current.pos.add(inDir), statusToTile(stat));
						this.nodeCount++;
						break;
				}
			}
			switch (move) {
				case Move.NORTH:
					child.south = current.north;
					break;
				case Move.EAST:
					child.west = current.east;
					break;
				case Move.SOUTH:
					child.north = current.south;
					break;
				case Move.WEST:
					child.east = current.west;
					break;
			}

			console.log('LETS TRY', inDir.marker, child.pos.toString(), child.deadend, this.nodeCount);
			if (child?.tile !== Tile.WALL) {
				const [result, found] = this.search(current, [current, child], control, winCondition);
				if (result && found) {
					return [result, found];
				}
				if (result) {
					res = result;
				} else {
					// ! BACKTRACK, SEARCH RETURNED NOTHING

					child.deadend = true;
					const sb = control(inDir.reverse());
					path.pop();
					console.log('STEP BACK', sb, 'to', child.pos.toString(), path.length);

					// const currentNode = path.pop();
					// console.log('DEADEND', currentNode);
				}
				// console.log('ONE DEEPR', result);
			} else {
				console.log('HIT WALL');
			}
		}

		return [res, false];
	}
}
