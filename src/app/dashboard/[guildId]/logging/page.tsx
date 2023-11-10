import Shell from "@/components/Shell";
import { Heading } from "@/components/ui/Heading";
import { Textarea } from "@/components/ui/TextArea";
import { getChannels, getGuild } from "../../loaders";
import { redirect } from "next/navigation";
import type { APIChannel } from "discord-api-types/v9";
import { SelectOne } from "@/components/ui/SelectOne";

async function getCurrentGuild(guildId: string) {
	const guild = await getGuild(guildId);
	if (!guild) return redirect("/dashboard");
	return guild;
}

// async function getChannels(guildId: string) {
// 	const result = await axios<APIChannel[]>({
// 		url: `/api/discord/getChannels?guildId=${guildId}`,
// 		method: "GET",
// 	}).catch((e) => console.error(e));

// 	const channels = result!.data.filter(
// 		(channel: APIChannel) => channel.type === 0
// 	);
// 	return channels;
// }

export default async function Logging({
	params,
}: {
	params: { guildId: string };
}) {
	const guild = await getCurrentGuild(params.guildId);
	const channels: APIChannel[] = await getChannels(guild.id);
	const channelsList: { label: string; value: string }[] = [];
	channels.forEach((c) => {
		channelsList.push({ label: c.name!, value: c.id });
	});

	return (
		<Shell layout="dashboard">
			<Heading
				centered={false}
				description="Change the logging settings of the server"
				title={`Logging settings for ${guild.name}`}
			/>
			<SelectOne
				channels={...channelsList}
				onChange={() => console.log("Changed")}
			/>
			<Textarea
				rows={1}
				className="w-full p-2 border resize-none"
				placeholder="Type your stuff here"
			/>
		</Shell>
	);
}
