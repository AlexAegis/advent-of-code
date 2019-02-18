import { elementFactory } from './element/element.factory';
import { Goblin } from './element/creature/goblin.class';
import { Wall } from './element/block/wall.class';
import { AVL } from './path/avl.class';
import { Convertable } from './path/convertable.interface';

const tree: AVL.Tree<number, Macska> = new AVL.Tree<number, number>();

export class Kutya implements Convertable<number> {
	n: number = 0;
	constructor(n: number) {
		//super();
		this.n = n;
	}
	convertTo(): number {
		return this.n;
	}
}

export class Macska {}
//tree.insert(-6, -4, -1, 1, 2, 3, 4, 5, 6, 11, 12);
/*
tree.insert(1);
tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(-6);
tree.insert(-1);
tree.insert(12);
tree.insert(-4);
tree.insert(11);*/

tree.push(1);
tree.push(2);
tree.push(3);
tree.push(4);
tree.push(5);
tree.push(6);
tree.push(7);
tree.set(3, 4);

let kutyus = new Kutya(10);

let cica = new Macska();
tree.push(kutyus);
tree.set(2, cica);
/**/

// 11 elments

/*
tree.insert(7);
console.log(`7 inserted!`);*/

console.log(tree.toArray().join(', '));
for (const node of tree.nodes()) {
	console.log(node.toString());
}
