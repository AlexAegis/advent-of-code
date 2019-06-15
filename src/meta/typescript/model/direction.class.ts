import { Coord } from './coord.class';
import { directionMarkerAssociations } from './direction-marker-associations.const';
import { DirectionMarker } from './direction-marker.type';

export class Direction extends Coord {
	constructor(public marker: DirectionMarker) {
		super(directionMarkerAssociations[marker]);
	}

	static directions: string[] = ['^', 'v', '>', '<'];

	static isHorizonal(marker: DirectionMarker): boolean {
		return marker === '>' || marker === '<';
	}

	static isVertical(marker: DirectionMarker): boolean {
		return marker === '^' || marker === 'v';
	}
}
