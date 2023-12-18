export interface QueueLike<N> {
	pop(): N | undefined;
	shift(): N | undefined;
	unshift(n: N): void;
	push(n: N): void;
}
