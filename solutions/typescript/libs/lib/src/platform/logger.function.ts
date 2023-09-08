import { bgGreen, white } from 'kolorist';
import type { TaskMetadata } from './task-resources.type.js';

export type Logger = (message: string) => void;

export const createLogger =
	(metadata: TaskMetadata): Logger =>
	(message: string) => {
		console.log(
			white(bgGreen(`[aoc:${metadata.year}-${metadata.day.toString().padStart(2, '0')}]`)),
			message,
		);
	};
