import type { DashboardSetting } from '$lib/types';

export async function saveData<T>(guildId: string, module: DashboardSetting, setting: string, value: any) {
	const body = { module, setting, value, guildId };

	const response = await fetch(`/api/saveData`, {
		method: 'POST',
		body: JSON.stringify(body)
	});

	const jsonResponse = await response.json();

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}

export async function save(
	guildId: string,
	module: DashboardSetting,
	setting: { [key: string]: any },
	saveSuccessful: () => void,
	saveFailed: () => void
) {
	const settingKey = Object.keys(setting)[0];
	const value = setting[settingKey];
	try {
		await saveData(guildId, module, settingKey, value);
		saveSuccessful();
	} catch (error) {
		console.error(error);
		saveFailed();
	}
}
