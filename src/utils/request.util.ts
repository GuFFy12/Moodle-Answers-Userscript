export default function <TContext = object>(request: Tampermonkey.Request<TContext>) {
	let xhr: Tampermonkey.AbortHandle<void>;

	const promise = new Promise<Tampermonkey.Response<TContext> | Tampermonkey.ErrorResponse | undefined>(function (
		resolve,
		reject,
	) {
		xhr = GM_xmlhttpRequest({
			...request,
			onabort: reject,
			onerror: reject,
			ontimeout: reject,
			onload: resolve,
		});
	});

	return {
		promise,
		abort: () => xhr.abort(),
	};
}
