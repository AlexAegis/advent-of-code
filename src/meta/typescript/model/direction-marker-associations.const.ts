import { Coord } from './coord.class';

export const directionMarkerAssociations: { [key: string]: Coord } = {
	'^': new Coord(0, 1),
	'>': new Coord(1, 0),
	v: new Coord(0, -1),
	'<': new Coord(-1, 0)
};

export const directionMarkerInvert: { [key: string]: string } = {
	'^': 'v',
	'>': '<',
	v: '^',
	'<': '>'
};
