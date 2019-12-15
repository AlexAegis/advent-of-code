import { Direction, directionMarkerAssociations, directionMarkerInvert, Vec2 } from '@lib/model';
import { Move, Status, statusToTile, Tile } from './meta';

export class GridGraphNode {
	public north: GridGraphNode | undefined;
	public south: GridGraphNode | undefined;
	public west: GridGraphNode | undefined;
	public east: GridGraphNode | undefined;
	public constructor(public pos: Vec2, public tile: Tile) {}

	public children(except?: GridGraphNode): [Move, Direction, GridGraphNode | undefined][] {
		const res: [Move, Direction, GridGraphNode | undefined][] = [];
		if (!except || !this.north || !except.pos.equals(this.north.pos)) {
			res.push([Move.NORTH, Direction.NORTH, this.north]);
		}
		if (!except || !this.east || !except.pos.equals(this.east.pos)) {
			res.push([Move.EAST, Direction.EAST, this.east]);
		}
		if (!except || !this.south || !except.pos.equals(this.south.pos)) {
			res.push([Move.SOUTH, Direction.SOUTH, this.south]);
		}
		if (!except || !this.west || !except.pos.equals(this.west.pos)) {
			res.push([Move.WEST, Direction.WEST, this.west]);
		}
		return res;
	}
}
// tslint:disable-next-line: max-classes-per-file
export class GridGraph {
	public constructor() {}
	public limit = 100;
	public search(
		path: GridGraphNode[],
		control: (dir: Direction) => Status,
		winCondition: (t: Tile) => boolean
	): GridGraphNode | undefined {
		const prev: GridGraphNode | undefined = path[path.length - 2];
		// console.log('PATH', path);
		const curr = path[path.length - 1];
		if (winCondition(curr.tile)) {
			return curr;
		} else if (path.length >= this.limit) {
			return undefined;
		}

		const childrenExceptPrev = curr.children(prev);
		// console.log('childrenExceptPrev: ', childrenExceptPrev);
		for (let [move, inDir, child] of childrenExceptPrev) {
			// For every possible direction except the previous
			if (child === undefined) {
				// If we do now know it, explore
				const stat = control(inDir);

				switch (move) {
					case Move.NORTH:
						child = curr.north = new GridGraphNode(curr.pos.add(inDir), statusToTile(stat));
						break;
					case Move.EAST:
						child = curr.east = new GridGraphNode(curr.pos.add(inDir), statusToTile(stat));
						break;
					case Move.SOUTH:
						child = curr.south = new GridGraphNode(curr.pos.add(inDir), statusToTile(stat));
						break;
					case Move.WEST:
						child = curr.west = new GridGraphNode(curr.pos.add(inDir), statusToTile(stat));
						break;
				}
			}
			switch (move) {
				case Move.NORTH:
					child.south = curr.north;
					break;
				case Move.EAST:
					child.west = curr.east;
					break;
				case Move.SOUTH:
					child.north = curr.south;
					break;
				case Move.WEST:
					child.east = curr.west;
					break;
			}

			// console.log(child?.tile);
			if (child?.tile !== Tile.WALL) {
				const result = this.search([...path, child], control, winCondition);
				// console.log('ONE DEEPR', result);
			}
		}

		return undefined;
	}
}
