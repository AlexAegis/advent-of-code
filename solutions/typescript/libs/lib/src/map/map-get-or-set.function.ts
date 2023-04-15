export const mapGetOrSet = <K, V>(map: Map<K, V>, key: K, initialize: (key: K) => V): V => {
	const value = map.get(key);
	if (value) {
		return value;
	} else {
		const newValue = initialize(key);
		map.set(key, newValue);
		return newValue;
	}
};
