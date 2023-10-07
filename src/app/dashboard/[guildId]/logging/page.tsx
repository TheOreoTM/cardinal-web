import Shell from "@/components/Shell";
import { Heading } from "@/components/ui/Heading";
import { Textarea } from "@/components/ui/TextArea";
import { getChannels, getGuild } from "../../loaders";
import { redirect } from "next/navigation";
import { apiFetch } from "@/util/utils";

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
	const channels = await getChannels(guild.id);
	const data = await apiFetch<any>(`/guilds/${guild.id}/settings`);

	return (
		<Shell layout="dashboard">
			<Heading
				centered={false}
				description="Change the logging settings of the server"
				title={`Logging settings for ${guild.name}`}
			/>
			{JSON.stringify(channels)}
			<Textarea
				rows={1}
				className="w-full p-2 border resize-none"
				placeholder="Type your stuff here"
			/>
			{JSON.stringify(data)}
		</Shell>
	);
}
