export class Util {
    static resolveString(data) {
        if (typeof data === 'string') return data;
        if (Array.isArray(data)) return data.join('\n');
        return String(data);
    }
	
	static isClass(input) {
		return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
	}
}