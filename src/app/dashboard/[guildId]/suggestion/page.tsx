import Shell from "@/components/Shell";
import { Heading } from "@/components/ui/Heading";
import { getGuild } from "../../loaders";
import { redirect } from "next/navigation";
import { Subheading } from "@/components/ui/SubHeading";
import axios from "axios";

async function getCurrentGuild(guildId: string) {
	const guild = await getGuild(guildId);
	return guild;
}

const fetchChannels = async (guildId: string) => {
	const result = await axios({
		url: `/api/discord/getChannels?guildId=${guildId}`,
		method: "GET",
	}).catch((err) => {
		console.log(err);
	});

	console.log(result);
	return result;
};

export default async function Suggestion({
	params,
}: {
	params: { guildId: string };
}) {
	console.log("Test");
	const guild = await getCurrentGuild(params.guildId);
	if (!guild) return redirect("/dashboard");

	const channels = await fetchChannels(guild.id);
	console.log(channels);

	return (
		<Shell layout="dashboard">
			<Heading
				centered={false}
				description="Change the suggestion settings of the server"
				title={`Suggestion settings for ${guild.name}`}
			/>
			<Subheading
				description="The channel you want the suggestions to be sent to"
				title="Suggestion Channel"
			/>
			{JSON.stringify(channels)}
		</Shell>
	);
}
