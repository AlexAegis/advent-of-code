let run = (cx: number, cy: number, mapSize: number, input: number) => {
	let ripple = (radius: number, xoffset: number = 0, yoffset: number = 0): Array<{ x: number; y: number }> => {
		const result = [];
		if (radius === 0) {
			result.push({ x: xoffset, y: yoffset });
		}
		for (let i = -radius; i < radius; i++) {
			result.push({ x: -radius + xoffset, y: 1 + i + yoffset });
			result.push({ x: radius + xoffset, y: i + yoffset });
			result.push({ x: i + xoffset, y: -radius + yoffset });
			result.push({ x: 1 + i + xoffset, y: radius + yoffset });
		}
		return result;
	};

	let calc = (x: number, y: number) => {
		let rackID = x + 10;
		let powerLevel = rackID * y;
		powerLevel += input;
		powerLevel *= rackID;
		powerLevel = Math.floor((powerLevel % 1000) / 100);
		powerLevel -= 5;
		return powerLevel;
	};
	let maxSize = Math.min(cx, cy, mapSize - cx, mapSize - cy);
	let acc = { coord: { x: cx, y: cy }, sum: -Infinity, size: -Infinity };
	let sum = 0;
	for (let ring = 0; ring < 15; ring++) {
		sum = ripple(ring, cx, cy)
			.map(c => calc(c.x, c.y))
			.reduce((acc, next) => (acc += next), sum);
		if (sum > acc.sum) {
			acc.size = ring * 2;
			acc.sum = sum;
		}
	}
	console.log('LOL');
	return acc;
};

console.time();
let max = run(236, 146, 300, 8561);
console.timeEnd();
console.log(`${max.coord.x},${max.coord.y},${max.size} (${max.sum})`); // 160
