declare global {
	interface Map<K, V> {
		getOrAdd(key: K, creator: (key: K) => V): V;
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

export default {};
