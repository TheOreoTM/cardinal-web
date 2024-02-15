import { writable } from 'svelte/store';

export const unsavedChanges = writable(false);
