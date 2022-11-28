/*import { Vec2 } from '../model/vector/vec2.class.js';

export const drawMapDynamic = <T>(map: Map<string, T>, renderTile: (t: T) => string, defaultTile = '.'): string[][] => {
	const res: string[][] = [];
	let yS = 0;
	for (const [s, t] of map.entries()) {
		const pos = new Vec2(s);
		if (res.length === 0) {
			res.push([]);
			yS = pos.y;
		} else if (pos.y < yS) {
			for (let i = 0; i < yS - pos.y; i++) {
				const newRow: string[] = [];
				for (let j = 0; j < res[0].length; j++) {
					newRow.push(defaultTile);
				}
				res.unshift(newRow);
			}
			yS = pos.y;
		}
	}
	return res;
};
*/
