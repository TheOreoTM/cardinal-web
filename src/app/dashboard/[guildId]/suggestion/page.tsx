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

export default async function Suggestion({
	params,
}: {
	params: { guildId: string };
}) {
	console.log("Test");
	const guild = await getCurrentGuild(params.guildId);
	if (!guild) return redirect("/dashboard");
	console.log(guild);

	const fetchChannels = async () => {
		const result = await axios({
			url: `/api/discord/getChannels?guildId=${guild.id}`,
			method: "GET",
		}).catch((err) => {
			console.log(err);
		});

		console.log(result);
	};

	await fetchChannels();

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
			<select> </select>
		</Shell>
	);
}
