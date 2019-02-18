import { elementFactory } from './element/element.factory';
import { Goblin } from './element/creature/goblin.class';
import { Wall } from './element/block/wall.class';
import { AVL } from './path/avl.class';

const tree: AVL.Tree<number> = new AVL.Tree<number>();

tree.insert(-6, -4, -1, 1, 2, 3, 4, 5, 6, 11, 12);
/*tree.insert(2);
tree.insert(3);
tree.insert(4);
tree.insert(5);
tree.insert(6);
tree.insert(-6);
tree.insert(-1);
tree.insert(12);
tree.insert(-4);
tree.insert(11);*/

// 11 elments

/*
tree.insert(7);
console.log(`7 inserted!`);*/

console.log(tree.toArray().join(', '));
for (const node of tree.nodes()) {
	console.log(node.toString());
}
