/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'cdn.discordapp.com',
			},
		],
	},
	async redirects() {
		return [
			{
				source: '/dashboard',
				destination: '/dashboard/settings',
				permanent: false,
			},
			{
				source: '/support',
				destination: 'https://discord.gg/54ZR2b8AYV',
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
