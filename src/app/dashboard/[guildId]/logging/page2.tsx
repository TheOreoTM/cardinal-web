"use client";

import Shell from "@/components/Shell";
import { Heading } from "@/components/ui/Heading";
import { Textarea } from "@/components/ui/TextArea";

import { redirect } from "next/navigation";
import { getGuild } from "../../loaders";

// const SelectChannel = dynamic(
// 	() => import("@components/selects/SelectChannel"),
// 	{
// 		ssr: false,
// 	}
// );

async function getCurrentGuild(guildId: string) {
	const guild = await getGuild(guildId);
	if (!guild) return redirect("/dashboard");
	return guild;
}

export default async function Logging({
	params,
}: {
	params: { guildId: string };
}) {
	try {
		const guild = await getCurrentGuild(params.guildId);

		// const channels: GuildChannel[] = await getChannels(params.guildId);

		// const channelsList: { label: string; value: string }[] = [];
		// channels.forEach((c) => {
		// 	channelsList.push({ label: c.name!, value: c.id });
		// });

		return (
			<Shell layout="dashboard">
				<Heading
					centered={false}
					description="Change the logging settings of the server"
					title={`Logging settings for ${guild.name}`}
				/>
				{/* <SelectChannel
					channels={channels}
					label="Select Channel"
					onReset={() => console.log("Reset")}
					value="setLoggingChannel"
					onChange={() => console.log("Changed")}
				/> */}
				<Textarea
					rows={1}
					className="w-full p-2 border resize-none"
					placeholder="Type your stuff here"
				/>
			</Shell>
		);
	} catch (error) {
		console.error("Error rendering logging page:", error);
		// Handle the error or log it appropriately
		// Example: redirect to an error page
		return redirect("/error");
	}
}
