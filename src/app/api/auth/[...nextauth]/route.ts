import { prisma } from '@/util/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { UserRole } from '@prisma/client';
import NextAuth, { type AuthOptions, type DefaultSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';

declare module 'next-auth' {
	interface Session extends DefaultSession {
		user: {
			id: string;
			role: UserRole;
			avatar: string;
			accessToken: string;
		} & DefaultSession['user'];
	}
}

export const nextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	session: {
		strategy: 'jwt',
	},
	providers: [
		DiscordProvider({
			clientId: process.env.DISCORD_CLIENT_ID!,
			clientSecret: process.env.DISCORD_CLIENT_SECRET!,
			authorization: {
				params: {
					scope: 'identify guilds email',
				},
			},
		}),
	],
	callbacks: {
		async jwt({ token, account }) {
			if (account) {
				token.accessToken = account.access_token;
			}
			return token;
		},
		async session({ session, token }) {
			session.user.accessToken = token.accessToken as string;

			return session;
		},
	},
} satisfies AuthOptions;

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
