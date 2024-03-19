import { writable } from 'svelte/store';

export const stateRedirect = writable<Record<string, string>>({});

stateRedirect.set({ text: 'hello world' });
stateRedirect.set({ test: 'bye world' });
