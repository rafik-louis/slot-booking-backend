import { Readable, ReadableOptions } from "stream";


export function objectStream(iterable: Iterable<any> | AsyncIterable<any>, options?: ReadableOptions) {
	return Readable.from(iterable, {
		objectMode: true,
		...options
	});
}