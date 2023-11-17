import { DISCORD_API_URL, DISCORD_TOKEN } from "@/util/constants";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const { searchParams } = new URL(request.url);
	const guildId = searchParams.get("guildId");
	const res = await axios({
		url: `${DISCORD_API_URL}/guilds/${guildId}/channels`,
		method: "GET",
		headers: {
			Authorization: `Bot ${DISCORD_TOKEN}`,
		},
	}).catch((e) => console.error(e));

	if (!res) {
		return;
	}

	return NextResponse.json({ res });
}
