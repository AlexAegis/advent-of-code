import { elementFactory } from './element/element.factory';
import { Goblin } from './element/creature/goblin.class';
import { Wall } from './element/block/wall.class';
import { AVL } from './path/avl.class';

export class ComparableKey implements AVL.Comparable<ComparableKey> {
	n: number = 0;
	constructor(n: number) {
		this.n = n;
	}
	compareTo(other: ComparableKey): number {
		return this.n - other.n;
	}
	toString(): string {
		return `ck: ${this.n}`;
	}
}

export class Dog implements AVL.Convertable<number> {
	n: number = 0;
	constructor(n: number) {
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
	constructor(private n: string) {}
	asNum(): number {
		return parseInt(this.n);
	}
	toString(): string {
		return 'cat: ' + JSON.stringify(this); //`cat: ${this.n}`;
	}
}

console.log(`Only Value Type with converter`);
let treeovtwc = new AVL.Tree<Cat>({ converter: Cat.prototype.asNum });

treeovtwc.push(new Cat('8'));
treeovtwc.push(new Cat('2'));
treeovtwc.push(new Cat('3'));
treeovtwc.push(new Cat('1'));
treeovtwc.push(new Cat('4'));
treeovtwc.push(new Cat('5'));
treeovtwc.push(new Cat('6'));
treeovtwc.push(new Cat('7'));
for (const node of treeovtwc.nodes()) {
	console.log(node.toString());
}

console.log(`Only Convertable Value Type `);

let treeocvt = new AVL.Tree<Dog>();

treeocvt.push(new Dog(8));
treeocvt.push(new Dog(2));
treeocvt.push(new Dog(3));
treeocvt.push(new Dog(1));
treeocvt.push(new Dog(4));
treeocvt.push(new Dog(5));
treeocvt.push(new Dog(6));
treeocvt.push(new Dog(7));
for (const node of treeocvt.nodes()) {
	console.log(node.toString());
}

console.log(`Only Numbers`);

let tree = new AVL.Tree();

tree.push(8);
tree.push(2);
tree.push(3);
tree.push(1);
tree.push(4);
tree.push(5);
tree.push(6);
tree.push(7);
for (const node of tree.nodes()) {
	console.log(node.toString());
}

console.log(`Non Convertable Object with number keys`);

let tree3 = new AVL.Tree<Cat>();

tree3.set(8, new Cat('8'));
tree3.set(2, new Cat('2'));
tree3.set(3, new Cat('3'));
tree3.set(1, new Cat('1'));
tree3.set(4, new Cat('4'));
tree3.set(5, new Cat('5'));
tree3.set(6, new Cat('6'));
tree3.set(7, new Cat('7'));
for (const node of tree3.nodes()) {
	console.log(node.toString());
}

console.log(`Non Convertable Object without keys (error)`);

let tree4 = new AVL.Tree<Cat>();

tree4.push(new Cat('8'));
tree4.push(new Cat('2'));
tree4.push(new Cat('3'));
tree4.push(new Cat('1'));
tree4.push(new Cat('4'));
tree4.push(new Cat('5'));
tree4.push(new Cat('6'));
tree4.push(new Cat('7'));
for (const node of tree4.nodes()) {
	console.log(node.toString());
}

console.log(`Non Convertable Object with string keys`);

let tree5 = new AVL.Tree<Cat>();

tree5.set('d', new Cat('8'));
tree5.set('f', new Cat('2'));
tree5.set(1, new Cat('3'));
tree5.set('a', new Cat('1'));
tree5.set('b', new Cat('4'));
tree5.set('c', new Cat('5'));
tree5.set('h', new Cat('6'));
tree5.set('e', new Cat('7'));
for (const node of tree5.nodes()) {
	console.log(node.toString());
}

console.log(tree5.get('b'));
//console.log(tree5['b']);
console.log(tree5.get(1));

// Only Value Type wi
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
