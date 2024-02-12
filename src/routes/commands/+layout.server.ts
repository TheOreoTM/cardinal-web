import type { FlattenedCommand } from '$lib/types';
import { apiFetch } from '$lib/utils/api';
import type { LayoutServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const commands = await apiFetch<FlattenedCommand[]>('/commands');
	locals.commands =
		locals.commands?.length ?? 0 === 0 ? commands : locals.commands;
	return { commands };
}) satisfies LayoutServerLoad;
