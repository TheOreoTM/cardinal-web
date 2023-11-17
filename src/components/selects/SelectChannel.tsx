import { memo } from "react";
import SelectOne, { type SelectOneProps } from "./SelectOne";
import { ChannelType, GuildChannel } from "discord.js";

export interface SelectChannelProps
	extends Omit<SelectOneProps, "values" | "name"> {
	value: string | null;
	channels: GuildChannel[];
}

const SelectChannel = ({
	label,
	value,
	channels,
	onChange,
	tooltipTitle,
	...props
}: SelectChannelProps) => {
	// eslint-disable-next-line @typescript-eslint/init-declarations
	let name;
	const channel = channels.find((c) => c.id === value);
	if (channel) name = channel.name;

	return (
		<SelectOne
			{...props}
			label={label}
			name={name}
			onChange={onChange}
			tooltipTitle={tooltipTitle}
			values={channels
				.filter(
					(c) =>
						c.type === ChannelType.GuildText ||
						c.type === ChannelType.GuildAnnouncement
				)
				.sort((c1, c2) => c1.position - c2.position)
				.map((c) => ({ name: c.name, value: c.id }))}
		/>
	);
};

export default memo(SelectChannel);
