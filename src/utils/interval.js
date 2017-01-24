export function instantInterval (
	func: Function,
	interval: Number,
	trigger: Boolean = true,
) {
	if (trigger) this::func();
	return setInterval(func, interval);
}