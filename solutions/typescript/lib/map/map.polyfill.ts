declare global {
	interface Map<K, V> {
		getOrAdd(key: K, creator: (key: K) => V): V;
		isTheSameAs(other: Map<K, V>): boolean;
		findKey(value: V): K | undefined;
		change(key: K, change: (value: V) => V, initialize: () => V): void;
	}
}

Map.prototype.change = function <K, V>(key: K, change: (value: V) => V, initialize: () => V): void {
	const existing = this.get(key);
	if (existing) {
		this.set(key, change(existing));
	} else {
		this.set(key, initialize());
	}
};

Map.prototype.findKey = function <K, V>(value: V): K | undefined {
	return [...this.entries()].find((e) => e[1] === value) as K | undefined;
};

Map.prototype.getOrAdd = function <K, V>(key: K, creator: (key: K) => V): V {
	const value = this.get(key);
	if (value) {
		return value;
	} else {
		const newValue = creator(key);
		this.set(key, newValue);
		return newValue;
	}
};

Map.prototype.isTheSameAs = function <K, V>(other: Map<K, V>): boolean {
	return [...this.keys()].every((key) => this.get(key) === other.get(key));
};

export default {};
