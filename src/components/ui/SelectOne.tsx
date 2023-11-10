"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "@util/utils";
import { Button } from "@components/ui/Button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
} from "@components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@components/ui/popover";

export interface SelectOneProps {
	channels: { label: string; value: string }[];
	onChange(...args: any[]): void;
}

export function SelectOne({ channels, onChange }: SelectOneProps) {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="secondary"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between">
					{value
						? channels.find((channel) => channel.value === value)?.label
						: "Select channel..."}
					<CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search channel..." className="h-9" />
					<CommandEmpty>No channel found.</CommandEmpty>
					<CommandGroup>
						{channels.map((channel) => (
							<CommandItem
								key={channel.value}
								value={channel.value} // ! How to change the value it searches for
								onSelect={(currentValue) => {
									setValue(currentValue === value ? "" : currentValue);
									setOpen(false);
									onChange();
								}}>
								{channel.label}
								<CheckIcon
									className={cn(
										"ml-auto h-4 w-4",
										value === channel.value ? "opacity-100" : "opacity-0"
									)}
								/>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
