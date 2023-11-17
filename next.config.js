/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "cdn.discord.com",
				protocol: "https",
			},
			{
				hostname: "cdn.discordapp.com",
				protocol: "https",
			},
		],
	},

	async redirects() {
		return [
			{
				source: "/dashboard",
				destination: "/dashboard/select",
				permanent: false,
			},
			{
				source: "/support",
				destination: "https://discord.gg/54ZR2b8AYV",
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
