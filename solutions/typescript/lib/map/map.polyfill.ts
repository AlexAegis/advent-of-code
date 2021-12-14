declare global {
	interface Map<K, V> {
		getOrAdd(key: K, creator: (key: K) => V): V;
		isTheSameAs(other: Map<K, V>): boolean;
		findKey(value: V): K | undefined;
		update(key: K, change: (value: V | undefined) => V): Map<K, V>;
		copy(): Map<K, V>;
		intoDictionary(): Record<string | number, V>;
		intoArray(): [K, V][];
		toString(): string;
		print(): void;
	}
}

Map.prototype.print = function (): void {
	console.log(this.toString());
};

Map.prototype.toString = function (): string {
	return JSON.stringify(this.intoDictionary());
};

Map.prototype.intoArray = function <K extends string | number, V>(): [K, V][] {
	return [...this.entries()];
};

Map.prototype.intoDictionary = function <K extends string | number, V>(): Record<K, V> {
	return Object.fromEntries(this.entries());
};

Map.prototype.copy = function <K extends string | number, V>(): Map<K, V> {
	return new Map<K, V>(this.entries());
};

Map.prototype.update = function <K extends string | number, V>(
	key: K,
	change: (value: V | undefined) => V
): Map<K, V> {
	this.set(key, change(this.get(key)));
	return this;
};

Map.prototype.findKey = function <K extends string | number, V>(value: V): K | undefined {
	return [...this.entries()].find((e) => e[1] === value) as K | undefined;
};

Map.prototype.getOrAdd = function <K extends string | number, V>(
	key: K,
	creator: (key: K) => V
): V {
	const value = this.get(key);
	if (value) {
		return value;
	} else {
		const newValue = creator(key);
		this.set(key, newValue);
		return newValue;
	}
};

Map.prototype.isTheSameAs = function <K extends string | number, V>(other: Map<K, V>): boolean {
	return [...this.keys()].every((key) => this.get(key) === other.get(key));
};

export default {};
