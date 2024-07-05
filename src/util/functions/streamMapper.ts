import * as transform from "parallel-transform";

interface StreamMapperOptions {
	maxConcurrency: number;
}

export function streamMapper<T, O>(mapFn: (arg: T) => O | Promise<O>, options?: StreamMapperOptions) {
	return transform(options?.maxConcurrency || 10, async function (data, callback) {
		try {
			callback(null, await mapFn(data));
		} catch (error) {
			callback(error);
		}
	});
}