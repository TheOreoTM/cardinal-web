export function getGuildAvatarUrl(id: string, icon: string | null): string {
	const url = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
	if (icon == null)
		return 'https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg';
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
