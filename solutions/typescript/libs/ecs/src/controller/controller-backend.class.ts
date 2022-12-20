export abstract class ControllerBackend {
	/**
	 * Start all listeners
	 */
	abstract start(): Promise<void>;
	abstract onKeyPress(callback: (char: string) => void): void;
	abstract onTerminateRequest(callback: () => void): void;
}
