import { Vec2 } from '@alexaegis/advent-of-code-lib/model';

export const ripple = (radius: number, xoffset = 0, yoffset = 0): Vec2[] => {
	const result = [];
	if (radius === 0) {
		result.push(new Vec2(xoffset, yoffset));
	}
	for (let i = -radius; i < radius; i++) {
		result.push(
			new Vec2(-radius + xoffset, 1 + i + yoffset), // top
			new Vec2(radius + xoffset, i + yoffset), // bottom
			new Vec2(i + xoffset, -radius + yoffset), // left
			new Vec2(i + xoffset + 1, radius + yoffset), // right
		);
	}
	return result;
};
