export const printMatrix = (
	matrix: string[][],
	flipVertical = false,
	flipHorizontal = false
): string => {
	let rows = matrix.map((row) => {
		if (flipHorizontal) {
			row = row.reverse();
		}
		return row.join('');
	});
	if (flipVertical) {
		rows = rows.reverse();
	}
	return rows.join('\n');
};
