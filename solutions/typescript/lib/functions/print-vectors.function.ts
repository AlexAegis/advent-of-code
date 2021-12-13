import { Vec2 } from '@lib/model';
import { printMatrix } from '.';

export type BoundingBox = { topLeft: Vec2; bottomRight: Vec2 };
export const boundingBoxOf = (vects: Vec2[]): BoundingBox => {
	let minX = 0;
	let minY = 0;
	let maxX = 0;
	let maxY = 0;
	for (const vec of vects) {
		if (vec.x < minX) {
			minX = vec.x;
		}
		if (vec.y < minY) {
			minY = vec.y;
		}
		if (vec.x > maxX) {
			maxX = vec.x;
		}
		if (vec.y > maxY) {
			maxY = vec.y;
		}
	}
	return { topLeft: new Vec2(minX, minY), bottomRight: new Vec2(maxX, maxY) };
};

export const getMatrixRenderBase = (
	vects: Vec2[],
	padding = 0
): { matrix: string[][] } & BoundingBox => {
	const { topLeft, bottomRight } = boundingBoxOf(vects);
	const matrix: string[][] = [];
	for (let y = topLeft.y - padding; y <= bottomRight.y + padding; y++) {
		const row: string[] = [];
		for (let x = topLeft.x - padding; x <= bottomRight.x + padding; x++) {
			row.push('.');
		}
		matrix.push(row);
	}
	return {
		matrix,
		topLeft: new Vec2(topLeft).addMut({ x: padding, y: padding }),
		bottomRight: new Vec2(bottomRight).addMut({ x: padding, y: padding }),
	};
};

const applyLayerToMatrix = (
	matrix: string[][],
	layer: Vec2[],
	topLeft: Vec2 = Vec2.ORIGIN,
	symbol = '#'
): string[][] => {
	for (const vec of layer) {
		matrix[topLeft.y + vec.y][topLeft.x + vec.x] = symbol;
	}
	return matrix;
};

export const renderVectorLayers = (
	layers: { vectors: Vec2[]; symbol: string }[],
	options?: {
		flipHorizontal?: boolean;
		flipVertical?: boolean;
		print?: boolean;
		padding?: number;
	}
): string => {
	const allVectors = layers.flatMap((layer) => layer.vectors);
	const { matrix, topLeft } = getMatrixRenderBase(allVectors, options?.padding);
	for (const { vectors, symbol } of layers) {
		applyLayerToMatrix(matrix, vectors, topLeft, symbol);
	}
	const str = printMatrix(matrix, options?.flipVertical, options?.flipHorizontal);
	if (options?.print) {
		console.log(str);
	}
	return str;
};

export const renderVectors = (
	vectors: Vec2[],
	options?: {
		flipHorizontal?: boolean;
		flipVertical?: boolean;
		print?: boolean;
		padding?: number;
	}
): string => renderVectorLayers([{ vectors, symbol: '#' }], options);
