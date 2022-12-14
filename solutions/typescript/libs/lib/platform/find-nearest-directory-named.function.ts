import { existsSync } from 'node:fs';
import { join, normalize } from 'node:path';

export const findNearestDirectoryNamed = (
	directoryName: string,
	cwd: string = process.cwd(),
	collection: string[] = []
): string | undefined => {
	const path = normalize(cwd);
	if (existsSync(join(path, directoryName))) {
		return path;
	}

	const parentPath = join(path, '..');
	if (parentPath !== path) {
		return findNearestDirectoryNamed(directoryName, parentPath, collection);
	} else {
		return undefined;
	}
};
