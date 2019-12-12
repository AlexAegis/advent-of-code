import { Vec2 } from './vec2.class';

export const directionMarkerAssociations: { [key: string]: Vec2 } = {
	'^': new Vec2(0, 1),
	'>': new Vec2(1, 0),
	v: new Vec2(0, -1),
	'<': new Vec2(-1, 0)
};

export const directionMarkerInvert: { [key: string]: string } = {
	'^': 'v',
	'>': '<',
	v: '^',
	'<': '>'
};
