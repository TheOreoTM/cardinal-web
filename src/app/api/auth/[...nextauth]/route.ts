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
		async jwt({ token, user }) {
			const dbUser = await prisma.user.findFirst({
				where: {
					email: token.email,
				},
			});

			if (!dbUser) {
				if (user) {
					token.id = user.id;
				}

				return token;
			}

			// console.log(user, token);

			return {
				id: dbUser.id,
				name: dbUser.name,
				email: dbUser.email,
				role: dbUser.role,
				picture: dbUser.image,
			};
		},

		async session({ token, session }) {
			if (token) {
				session.user.id = token.id as string;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.role = token.role as UserRole;
				session.user.image = token.picture;
			}

			return session;
		},
	},
} satisfies AuthOptions;

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
