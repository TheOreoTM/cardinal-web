import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL, DISCORD_TOKEN } from "./constants";
import axios, { type AxiosHeaders } from "axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const isActiveRoute = (
	currentRouteHref: string,
	providedRouteHref: string
) => currentRouteHref.startsWith(providedRouteHref);

export async function apiFetch<T>(path: string, options?: AxiosHeaders) {
	const response = await axios.get<T>(`${API_URL}${path}`, {
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`,
			"Content-Type": "application/json",
			...options,
		},
	});

	const data = await response.data;
	return data;
}
