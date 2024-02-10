// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

import type { FlattenedCommand } from '$lib/types';
import type { APIGuild, APIUser } from 'discord-api-types/v10';

// and what to do when importing types
declare global {
	namespace App {
		interface Locals {
			user: APIUser | null;
			guild: APIGuild | null;
			commands: FlattenedCommand[];
		}

		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
