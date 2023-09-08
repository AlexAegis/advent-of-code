import type { Awaitable } from '@alexaegis/advent-of-code-lib';
import type { Entity } from '../entity/entity.class.js';
import type { IOBackend } from '../renderer/index.js';
import type { Initializable } from '../system/initializable.interface.js';
import { System } from '../system/system.type.js';
import type { GridWorld } from '../world/grid-world.class.js';
import type { TimeData } from '../world/time-data.interface.js';
import { ControllerBuffer } from './control-buffer.class.js';

export class BasicController extends System implements Initializable {
	readonly order = -1;

	buffer: ControllerBuffer;

	constructor(
		private readonly backend: IOBackend,
		private readonly targetEntity: Entity,
		private readonly eventMap: Record<
			string,
			(entity: Entity, world: GridWorld, timeData: TimeData) => void
		>,
	) {
		super();
		this.buffer = new ControllerBuffer(this.backend);
	}

	init(): Awaitable<void> {
		this.buffer.init();
		return undefined;
	}

	tick(world: GridWorld, timeData: TimeData): boolean | undefined {
		for (const key in this.eventMap) {
			if (this.buffer.keyBuffer[key]) {
				this.eventMap[key]?.(this.targetEntity, world, timeData);
				// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
				delete this.buffer.keyBuffer[key];
			}
		}

		return undefined;
	}
}
