export interface GridWorldOptions {
	/**
	 * @default true
	 */
	withDefaultRendererAndCamera?: boolean;
}

export const normalizeGridWorldOptions = (
	options?: GridWorldOptions
): Required<GridWorldOptions> => {
	return {
		withDefaultRendererAndCamera: options?.withDefaultRendererAndCamera ?? true,
	};
};
