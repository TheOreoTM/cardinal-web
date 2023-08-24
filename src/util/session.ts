'use server';

import { getServerSession } from 'next-auth';

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
	return getServerSession(nextAuthOptions);
}

export async function getCurrentUser() {
	const session = await getSession();
	return session?.user;
}
