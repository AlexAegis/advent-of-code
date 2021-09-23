export const usingMap =
	<K extends string | number | symbol = string, V = string>(map: Record<K, V>) =>
	(key: K): V =>
		map[key];
