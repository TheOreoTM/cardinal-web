import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL, DISCORD_TOKEN } from "./constants";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isActiveRoute = (
	currentRouteHref: string,
	providedRouteHref: string
) => currentRouteHref.startsWith(providedRouteHref);

export async function apiFetch<T>(path: string, options: RequestInit = {}) {
	const response = await fetch(`${API_URL}${path}`, {
		...options,
		credentials: "include",
		headers: {
			...options.headers,
			"Content-Type": "application/json",
			"Authorization": `Bot ${DISCORD_TOKEN}`,
		},
	});

	const jsonResponse = await response.json();
	console.log(jsonResponse);

	if (jsonResponse.error) {
		throw response;
	} else {
		return jsonResponse as T;
	}
}
