import { Vec2 } from '@lib/model';

export const drawMapStatic = <T>(
	map: Map<string, T>,
	renderTile: (t?: T) => string,
	startY: number,
	endY: number,
	startX: number,
	endX: number
): string[][] => {
	const res: string[][] = [];
	for (let i = startY; i <= endY; i++) {
		const row = [];
		for (let j = startX; j <= endX; j++) {
			row.push(renderTile(map.get(new Vec2(j, i).toString())));
		}
		res.push(row);
	}
	return res;
};
