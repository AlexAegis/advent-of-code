import { loadTaskResources, split, TaskResources } from '@alexaegis/advent-of-code-lib';
import { beforeAll, describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { ExpeditionFileSystem } from './expedition-file-system.class.js';

describe('ExpeditionFileSystem', () => {
	let resources!: TaskResources<string>;
	let fs!: ExpeditionFileSystem;
	beforeAll(async () => {
		resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		fs = new ExpeditionFileSystem().interpret(split(resources.input));
	});

	it('should be able to render the filesystem', () => {
		expect(fs.render()).toBe(`- / (dir, size=48381165)
  - a (dir, size=94853)
    - e (dir, size=584)
      - i (file, size=584)
    - f (file, size=29116)
    - g (file, size=2557)
    - h.lst (file, size=62596)
  - d (dir, size=24933642)
    - j (file, size=4060174)
    - d.log (file, size=8033020)
    - d.ext (file, size=5626152)
    - k (file, size=7214296)
  - b.txt (file, size=14848514)
  - c.dat (file, size=8504156)`);
	});

	it('should be able to get the absolutePath of a node', () => {
		const nodeA = fs.root.directories.get('a');
		const nodeE = nodeA?.directories.get('e');

		expect(fs.root.absolutePath).toBe('/');
		expect(nodeA?.absolutePath).toBe('/a');
		expect(nodeE?.absolutePath).toBe('/a/e');
	});
});
