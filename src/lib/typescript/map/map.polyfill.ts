declare global {
	interface Map<K, V> {
		getOrAdd(key: K, creator: (key: K) => V): V;
		isTheSameAs(other: Map<K, V>): boolean;
	}
}

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
