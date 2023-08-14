import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: `http://localhost:${process.env.PORT || 3000}`
	),
	title: 'Reindeer - User reports Discord bot',
	description:
		'Reindeer is a Discord bot that helps server admins manage message and user reports better.',
	icons: ['/bot-icon.png'],
	themeColor: '#fe2828',
	openGraph: {
		type: 'website',
		images: ['/bot-icon.png'],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en'>
			<head>
				<meta itemProp='thumbnailUrl' content='/bot-icon.png' />
				<meta itemProp='image' content='/bot-icon.png' />
				<meta itemProp='imageUrl' content='/bot-icon.png' />
			</head>
			<body className={` bg-background text-text`}>
				<NextTopLoader color='#99af64' showSpinner={false} />
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
