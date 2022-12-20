import type { Constructor } from '@alexaegis/advent-of-code-lib';
import type { Entity } from '../entity/index.js';
import type { GridWorld } from '../grid-world.class.js';

export abstract class Component {
	belongsTo: Entity[] = [];
	_world: GridWorld | undefined;

	is<C extends Component>(component: Constructor<C>): boolean {
		return this instanceof component;
	}

	world(): GridWorld {
		if (this._world) {
			return this._world;
		} else {
			throw new Error('Component is not attached to any world');
		}
	}

	attachWorld(world: GridWorld): void {
		this._world = world;
	}

	componentType(): Constructor<this> {
		return Object.getPrototypeOf(this).constructor as Constructor<this>;
	}

	componentName(): string {
		return this.componentType().name;
	}
}
