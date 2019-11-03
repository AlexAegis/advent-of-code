export function Sealed() {
	return (target: object, propertyKey: string, descriptor: TypedPropertyDescriptor<any>): any => {
		console.log('target', target);
		(target as any)[propertyKey]();
		return descriptor;
	};
}
