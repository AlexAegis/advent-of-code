import { Vec2 } from '@alexaegis/advent-of-code-lib';

export interface GalaxyMap {
	galaxies: Vec2[];
	emptyRows: number[];
	emptyColumns: number[];
}

export const parse = (input: string): GalaxyMap => {
	const gg = input.toGridGraph({
		weighter: (_a, _b) => 1,
	});

	const verticalIndices = gg.boundingBox().vertical.collectValues();
	const horizontalIndices = gg.boundingBox().horizontal.collectValues();

	const emptyRows = verticalIndices
		.map((y) => horizontalIndices.map((x) => new Vec2(x, y)))
		.filterMap((column, i) => {
			const colNodes = column.map((c) => gg.getNode(c));
			return colNodes.every((node) => node?.value === '.') ? i : undefined;
		});

	const emptyColumns = horizontalIndices
		.map((x) => verticalIndices.map((y) => new Vec2(x, y)))
		.filterMap((row, i) => {
			const rowNodes = row.map((r) => gg.getNode(r));
			return rowNodes.every((node) => node?.value === '.') ? i : undefined;
		});

	const galaxies = gg.nodes
		.valueArray()
		.filter((node) => node.value !== '.')
		.map((node) => node.coordinate);

	return { galaxies, emptyRows, emptyColumns };
};
