export type DashboardSetting = 'stats' | 'moderation' | 'logging' | 'bot';

export interface GuildData {
	guildId: string;
	roleTrainee?: string | null;
	roleStaff?: string | null;
	roleModerator?: string | null;
	roleAdmin?: string | null;
	roleMuted?: string | null;

	bannedWords?: AutomodBannedWords | null;
	capitalization?: AutomodCapitalization | null;
	inviteLinks?: AutomodInviteLinks | null;
	linkCooldown?: AutomodLinkCooldown | null;
	links?: AutomodLinks | null;
	massMention?: AutomodMassMention | null;
	newLines?: AutomodNewlines | null;
	spam?: AutomodSpam | null;
	stickers?: AutomodStickers | null;

	lookback: number;
	prefix: string;
	premium: boolean;

	restrictionNodes: RestrictionNode[];

	channelModlog?: string | null;
	channelSuggestion?: string | null;

	suggestionCreateThread?: boolean | null;

	appealLink?: string | null;

	useCachedStats: boolean;

	lockdownChannelList: string[];
	lockdownChannelListType: 'whitelist' | 'blacklist';
	isLocked: boolean;
}

export type GuildDataKey = keyof GuildData;

export interface BaseAutomodData {
	enabled: boolean;
	actions: ModerationType[];
	automuteAfter: number;
	automuteDuration: number;
	ignoredRoles: string[];
	ignoredChannels: string[];
	affectedRoles: string[];
	affectedChannels: string[];
	logChannel?: string | null;
	response?: string | null;
}

// Define Automod data types extending from base
export interface AutomodBannedWords extends BaseAutomodData {
	wildcard: string[];
	exact: string[];
}

export interface AutomodCapitalization extends BaseAutomodData {
	percentage?: number;
}

export interface AutomodInviteLinks extends BaseAutomodData {
	allowedInvites: string[];
}

export interface AutomodStickers extends BaseAutomodData {}

export interface AutomodLinkCooldown extends BaseAutomodData {
	cooldown?: number;
}

export interface AutomodLinks extends BaseAutomodData {
	allowedLinks: string[];
	deniedLink: string[];
}

export interface AutomodMassMention extends BaseAutomodData {
	count?: number;
}

export interface AutomodNewlines extends BaseAutomodData {
	rows?: number;
}

export interface AutomodSpam extends BaseAutomodData {
	messagesEveryFiveSeconds?: number;
}

export enum ModerationType {
	Warn = 'warn',
	Modnick = 'modnick',
	Mute = 'mute',
	Automute = 'automute',
	Ban = 'ban',
	Kick = 'kick',
	Unmute = 'unmute',
	Unban = 'unban',
	Unwarn = 'unwarn',
	Afkreset = 'afkreset',
	Afkclear = 'afkclear'
}

interface RestrictionNode {
	id: string;
	targetId: string;
	allow: string[];
	deny: string[];
}

export interface FlattenedCommand {
	category: string;

	description: string;

	detailedDescription: ExtendedHelp & { prefix: string };

	guarded: boolean;

	name: string;

	permissionLevel: number;

	preconditions: Preconditions;
}

export interface Preconditions {
	entries: PreconditionsEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionsEntry {
	entries: PreconditionEntryEntry[];

	mode: number;

	runCondition: number;
}

export interface PreconditionEntryEntry {
	context: unknown;

	name: string;
}

interface ExtendedHelp {
	examples?: (null | string)[];

	explainedUsage?: [string, string][];

	extendedHelp?: string;

	possibleFormats?: [string, string][];

	reminder?: string;

	usages?: string[];
}

export const enum PermissionLevels {
	Everyone = 0,
	Trainee = 3,
	Staff = 4,
	Moderator = 5,
	Administrator = 6,
	ServerOwner = 7,
	BotOwner = 10
}
