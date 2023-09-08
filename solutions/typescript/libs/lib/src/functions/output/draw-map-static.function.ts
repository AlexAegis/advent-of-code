import { Vec2 } from '../../model/vector/vec2.class.js';

export const drawMapStatic = <T>(
	map: Map<string, T>,
	renderTile: (t?: T) => string,
	startY: number,
	endY: number,
	startX: number,
	endX: number,
	flip = false,
	numbered = false,
): string[][] => {
	const res: string[][] = [];

	if (numbered) {
		res.push(
			[...Array.from({ length: endX - startX + 1 }).keys()]
				.map((i) => i + startX)
				.map((i) => (i >= 10 ? i.toString() : '0' + i.toString())),
		);
	}

	for (let i = startY; i <= endY; i++) {
		const row = numbered ? [i >= 10 ? i.toString() : '0' + i.toString()] : [];
		for (let j = startX; j <= endX; j++) {
			row.push(renderTile(map.get(new Vec2(flip ? i : j, flip ? j : i).toString())));
		}
		res.push(row);
	}
	return res;
};
