import { Cart } from '../model/cart.class';

export const cartSorter = (a: Cart, b: Cart): number =>
	a.position.y === b.position.y ? a.position.x - b.position.x : a.position.y - b.position.y;
