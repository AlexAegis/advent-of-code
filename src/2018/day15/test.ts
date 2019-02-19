import { elementFactory } from './element/element.factory';
import { Goblin } from './element/creature/goblin.class';
import { Wall } from './element/block/wall.class';
import { AVL } from './path/avl.class';

export class Dog implements AVL.Convertable<number> {
	n: number = 0;
	constructor(n: number) {
		//super();
		this.n = n;
	}
	convertTo(): number {
		return this.n;
	}
	toString(): string {
		return `dog: ${this.n}`;
	}
}

export class Cat {
	constructor(public n: string) {}
	asNum(): number {
		return 5;
	}
	toString(): string {
		return `${this.n}`;
	}
}

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
/*
tree.push(1);
tree.push(2);
tree.push(3);
tree.push(4);
tree.push(5);
tree.push(6);
tree.push(7);*/
//tree.set(3, 4);

let tree = new AVL.Tree<Cat>();

tree.push(new Cat('ti1'));
tree.push(new Cat('ti2'));
tree.push(new Cat('ti3'));
tree.push(new Cat('ti4'));
tree.push(new Cat('ti5'));
tree.push(new Cat('ti6'));
tree.push(new Cat('ti7'));
for (const node of tree.nodes()) {
	console.log(node.toString());
}
// tree.push(kutyus);
/*
tree.set(cica, cica);
tree.forEach(i => {
	i;
});

let kivagy = tree.get(kutyus);
console.log(kivagy);*/
/**/

// 11 elments

/*
tree.insert(7);
console.log(`7 inserted!`);*/
/*
console.log(tree.toArray().join(', '));



const catTree: AVL.LTree<Cat> = new AVL.LTree(c => 0);

catTree.set(1, new Cat('a'));
catTree.set(2, new Cat('b'));
catTree.set(3, new Cat('c'));
catTree.set(4, new Cat('d'));
console.log(catTree.get(4).name);
*/
