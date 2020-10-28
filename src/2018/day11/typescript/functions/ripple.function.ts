import { Coord } from '../model/coord.class';

export const ripple = (radius: number, xoffset = 0, yoffset = 0): Coord[] => {
	const result = [];
	if (radius === 0) {
		result.push(new Coord(xoffset, yoffset));
	}
	for (let i = -radius; i < radius; i++) {
		result.push(new Coord(-radius + xoffset, 1 + i + yoffset)); // top
		result.push(new Coord(radius + xoffset, i + yoffset)); // bottom
		result.push(new Coord(i + xoffset, -radius + yoffset)); // left
		result.push(new Coord(i + xoffset + 1, radius + yoffset)); // right
	}
	return result;
};
