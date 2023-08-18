import encrypt from '@util/encrypt';
import { prisma } from '@util/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
	const { guildId } = req.query;
	if (!guildId) {
		return res.status(400).json({ error: 'Provide a "guildId" parameter' });
	}

	const guild = await prisma.guild.findUnique({
		where: {
			guildId: guildId as string,
		},
	});

	res.status(200).json(guild);
};

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
	const { guildId, prefix } = req.body;

	if (!guildId || !prefix) {
		return res.status(400).json({
			error: 'Please provide "guildId" and "prefix" field',
		});
	}

	const item = await prisma.guild.upsert({
		where: { guildId, sub: req.body.sub },
		create: {
			guildId,
			prefix,
			sub: req.body.sub,
		},
		update: {
			prefix,
		},
	});

	if (item) {
		return res.status(200).json({
			guildId: item.guildId,
			prefix: item.prefix,
			message: 'Successfully updated prefix',
		});
	}
	return res.status(405);
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const token = await getToken({ req });

	if (!token) {
		return res.status(401).send({ message: 'Unauthorized' });
	}

	req.body = { sub: encrypt(token.sub!) };

	if (!req.body.sub) {
		return res.status(401).send({ message: 'Unauthorized' });
	}

	if (req.method === 'GET') {
		await GET(req, res);
	} else if (req.method === 'POST') {
		await POST(req, res);
	} else {
		res.status(405).end();
	}
}
