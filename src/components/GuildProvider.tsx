'use client';

import type { Guild, PartialGuild } from '@/util/types/discord';
import { createContext, useState, useContext } from 'react';

const GuildContext = createContext<GuildContextProps | undefined>(undefined);

export function GuildProvider({ children }: { children: React.ReactNode }) {
	const [guild, setGuild] = useState<any | null>(null);

	return (
		<GuildContext.Provider value={{ guild: guild, setGuild: setGuild }}>
			{children}
		</GuildContext.Provider>
	);
}

export function useGuildContext() {
	const context = useContext(GuildContext);
	if (!context) {
		throw new Error('useGuildContext must be used within a GuildProvider');
	}
	return context;
}

type GuildContextProps = {
	guild: Guild | PartialGuild; // Replace 'any' with your actual guild info type
	setGuild: React.Dispatch<React.SetStateAction<any>>;
};

// Deprecated
