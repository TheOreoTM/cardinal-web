import type { DashboardSetting } from '$lib/types';

export async function saveData<T>(guildId: string, setting: DashboardSetting, data: Record<string, any>) {
	const response = await fetch(`/api/saveData`, {
		method: 'POST',
		body: JSON.stringify(data)
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}

export function save(
	guildId: string,
	setting: DashboardSetting,
	values: Record<string, any>,
	saveSuccessful: () => void,
	saveFailed: () => void
) {
	saveData(guildId, setting, values)
		.then(() => {
			saveSuccessful();
		})
		.catch(() => {
			saveFailed();
		});
}
