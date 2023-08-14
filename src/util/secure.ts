import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';

export default async function secure(
	context: GetServerSidePropsContext,
	callback: (data: { session: any }) => void
) {
	const session = await getSession(context);

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return callback({ session });
}
