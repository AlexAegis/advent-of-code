import { BoundingBox } from '../model/vector/bounding-box.class.js';
import { Vec2 } from '../model/vector/vec2.class.js';
import { renderMatrix } from './output/index.js';

export const getMatrixRenderBase = (
	vects: Vec2[]
): { matrix: string[][]; boundingBox: BoundingBox } => {
	const boundingBox = new BoundingBox(...vects);
	const matrix: string[][] = [];

	for (let y = boundingBox.topLeft.y; y <= boundingBox.bottomRight.y; y++) {
		const row: string[] = [];
		for (let x = boundingBox.topLeft.x; x <= boundingBox.bottomRight.x; x++) {
			row.push('.');
		}
		matrix.push(row);
	}

	return {
		matrix,
		boundingBox,
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
	const { matrix, boundingBox } = getMatrixRenderBase(allVectors);
	for (const { vectors, symbol } of layers) {
		applyLayerToMatrix(matrix, vectors, boundingBox.topLeft, symbol);
	}
	const str = renderMatrix(matrix, options?.flipVertical, options?.flipHorizontal);
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
