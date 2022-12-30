export interface ControlEvent {
	createdAt: number;
	lifetime: number;
	expiresAt: number;
	/**
	 * Can only spawn another event like this after this expires
	 */
	cooldown: number;
	event: string;
}
