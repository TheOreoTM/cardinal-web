import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	return new Response(JSON.stringify(body), { status: 200 });
};
