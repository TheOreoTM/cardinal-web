export function getGuildAvatarUrl(id: string, icon: string | null): string {
	const url = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
	if (icon == null) return 'https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg';
	return url;
}

export function getUserAvatarUrl(id: string, icon: string | null): string {
	const url = `https://cdn.discordapp.com/avatars/${id}/${icon}.png`;
	if (icon == null) return 'https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg';
	return url;
}

export function debounce<F extends (...args: any[]) => any>(
	func: F,
	delay: number
): (...args: Parameters<F>) => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	return (...args: Parameters<F>) => {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => func(...args), delay);
	};
}

export function getRandomItem<T>(arr: T[]) {
	return arr[Math.floor(Math.random() * arr.length - 1)] as T;
}

/**
 * Cuts the text to the latest whitespace before the length and if it cuts it adds an ellipsis
 * @param text The text to cut
 * @param length The length to cut the text to
 */
export function cutText(text: string, length: number, whitespace = true) {
	if (text.length < length) return text;
	let cut = text.slice(0, length);
	if (whitespace) {
		cut = cut.slice(0, cut.lastIndexOf(' '));
	}
	return cut + '...';
}
