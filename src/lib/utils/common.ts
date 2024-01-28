export function getGuildAvatarUrl(id: string, icon: string | null): string {
	const url = `https://cdn.discordapp.com/icons/${id}/${icon}.png`;
	if (icon == null)
		return 'https://media.pocketgamer.biz/2021/5/110514/discord-new-logo-2021-r225x.jpg';
	return url;
}
