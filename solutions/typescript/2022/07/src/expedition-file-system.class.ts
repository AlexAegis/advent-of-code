import type { SizedTuple } from '@alexaegis/advent-of-code-lib';
import { join } from 'path/posix';

export class ExpeditionFileSystem {
	static ROOT = '/';
	root = new ExpeditionFileSystemDirectory(undefined, ExpeditionFileSystem.ROOT);
	private cwd = this.root;

	interpret(commands: string[]): ExpeditionFileSystem {
		for (const command of commands) {
			const [c1, c2, c3] = command.split(' ') as SizedTuple<string, 3>;
			if (c1 === '$' && c2 === 'cd') {
				if (c3 === '/') {
					this.cwd = this.root;
				} else if (c3 === '..') {
					this.cwd = this.cwd.parent ?? this.root;
				} else {
					const parent = this.cwd;
					this.cwd = this.cwd.directories.getOrAdd(
						c3,
						() => new ExpeditionFileSystemDirectory(parent, c3)
					);
				}
			} else if (c1 === 'dir') {
				const parent = this.cwd;
				this.cwd.directories.getOrAdd(
					c2,
					() => new ExpeditionFileSystemDirectory(parent, c2)
				);
			} else if (c2 !== 'ls') {
				this.cwd.addFile(c2, parseInt(c1, 10));
			}
		}

		return this;
	}

	render(): string {
		return this.root.render();
	}
}

export class ExpeditionFileSystemDirectory {
	directories = new Map<string, ExpeditionFileSystemDirectory>();
	files = new Map<string, number>();

	size = 0;

	constructor(public parent: ExpeditionFileSystemDirectory | undefined, public name: string) {}

	*walkDirectories(): Generator<ExpeditionFileSystemDirectory> {
		yield this;
		for (const directory of this.directories.values()) {
			yield* directory.walkDirectories();
		}
	}

	*walkUp(): Generator<ExpeditionFileSystemDirectory> {
		yield this;
		if (this.parent) {
			yield* this.parent.walkUp();
		}
	}

	addFile(fileName: string, fileSize: number): void {
		if (!this.files.has(fileName)) {
			this.files.set(fileName, fileSize);
			for (const node of this.walkUp()) {
				node.size += fileSize;
			}
		}
	}

	get absolutePath(): string {
		if (!this.parent) {
			return ExpeditionFileSystem.ROOT;
		} else {
			return join(this.parent.absolutePath, this.name);
		}
	}

	render(indentation = 0): string {
		let result = `${'  '.repeat(indentation)}- ${this.name} (dir, size=${this.size})`;

		for (const directory of this.directories.values()) {
			result += '\n' + directory.render(indentation + 1);
		}

		for (const [fileName, fileSize] of [...this.files.entries()]) {
			result += `\n${'  '.repeat(indentation + 1)}- ${fileName} (file, size=${fileSize})`;
		}

		return result;
	}
}
