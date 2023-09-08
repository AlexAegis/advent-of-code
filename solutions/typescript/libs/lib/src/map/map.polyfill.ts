import { mapGetOrSet } from './map-get-or-set.function.js';

declare global {
	interface Map<K, V> {
		getOrAdd(key: K, creator: (key: K) => V): V;
		isTheSameAs(other: Map<K, V>): boolean;
		findKey(value: V): K | undefined;
		update(key: K, change: (value: V | undefined) => V): Map<K, V>;
		copy(): Map<K, V>;
		intoDictionary(): Record<string | number, V>;
		keyArray(): K[];
		entryArray(): [K, V][];
		valueArray(): V[];
		toString(): string;
		print(): void;
	}
}

Map.prototype.print = function (): void {
	console.info(this.toString());
};

Map.prototype.toString = function (): string {
	return JSON.stringify(this.intoDictionary());
};

Map.prototype.keyArray = function <K extends string | number>(): K[] {
	return [...this.keys()] as K[];
};

Map.prototype.valueArray = function <V>(): V[] {
	return [...this.values()] as V[];
};

Map.prototype.entryArray = function <K extends string | number, V>(): [K, V][] {
	return [...this.entries()];
};

Map.prototype.intoDictionary = function <K extends string | number, V>(): Record<K, V> {
	return Object.fromEntries(this.entries()) as Record<K, V>;
};

Map.prototype.copy = function <K extends string | number, V>(): Map<K, V> {
	return new Map<K, V>(this.entries());
};

Map.prototype.update = function <K extends string | number, V>(
	key: K,
	change: (value: V | undefined) => V,
): Map<K, V> {
	this.set(key, change(this.get(key) as V));
	return this;
};

Map.prototype.findKey = function <K extends string | number, V>(value: V): K | undefined {
	return [...this.entries()].find((e) => e[1] === value) as K | undefined;
};

Map.prototype.getOrAdd = function <K extends string | number, V>(
	key: K,
	initialize: (key: K) => V,
): V {
	return mapGetOrSet(this as Map<K, V>, key, initialize);
};

Map.prototype.isTheSameAs = function <K extends string | number, V>(other: Map<K, V>): boolean {
	return ([...this.keys()] as K[]).every((key) => this.get(key) === other.get(key));
};

export default {};
