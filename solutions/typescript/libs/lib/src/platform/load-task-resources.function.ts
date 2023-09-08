import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { findNearestDirectoryNamed } from './find-nearest-directory-named.function.js';
import type { TaskMetadata, TaskResources } from './task-resources.type.js';

/**
 * Factory function to create an input supplier
 *
 * @param year of the task
 * @param day of the task
 * @param file in the resources folder of the task
 */
export const loadTaskResources = async <A>(
	taskMetadata: Pick<TaskMetadata, 'year' | 'day'>,
	file = 'input.txt',
): Promise<TaskResources<string, A>> => {
	const resourcesRoot = findNearestDirectoryNamed('resources');
	if (!resourcesRoot) {
		throw new Error('resource directory not found');
	}

	const baseUrl = join(
		resourcesRoot,
		'resources',
		taskMetadata.year.toString(),
		taskMetadata.day.toString().padStart(2, '0'),
	);

	const [input, args] = await Promise.all([
		readFile(join(baseUrl, file), {
			encoding: 'utf8',
		}),
		// TODO: redo with @aa/node-common (strip extension and replace)
		readFile(join(baseUrl, `${file.split(/(.*)\..*/)[1]}.args.json`), {
			encoding: 'utf8',
		}).catch(() => undefined) as Promise<string>,
	]);

	return { input, args: args ? (JSON.parse(args) as A) : undefined };
};
