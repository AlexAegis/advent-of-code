import { benchTask } from './bench-task.function.js';
import { loadTaskResources } from './load-task-resources.function.js';
import { createLogger } from './logger.function.js';
import type { Solution } from './solution.type.js';
import type { TaskMetadata, TaskResources } from './task-resources.type.js';

export const task = async <Input extends string | number, Result, Args>(
	solution: Solution<Input, Result, Args>,
	taskMetadata: TaskMetadata,
	resourcesOverride?: TaskResources<Input, Args> | string
): Promise<Result | undefined> => {
	if (process && process.env['RUN']) {
		const log = createLogger(taskMetadata);
		log('starting...');
		let resources: TaskResources<Input, Args>;
		if (typeof resourcesOverride === 'object') {
			resources = resourcesOverride;
		} else {
			resources = (await loadTaskResources<Args>(
				taskMetadata,
				resourcesOverride
			)) as TaskResources<Input, Args>;
		}

		const result = await benchTask(solution, resources, log);
		log(`result:\n${result}`);
		return result;
	} else {
		return undefined;
	}
};
