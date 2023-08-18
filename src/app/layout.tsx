import Footer from '@/components/Footer';
import { type Metadata } from 'next';
import NextTopLoader from 'nextjs-toploader';
import './globals.css';
import Header from '@/components/Header';

export const metadata: Metadata = {
	metadataBase: new URL(
		process.env.VERCEL_URL
			? `https://${process.env.VERCEL_URL}`
			: `http://localhost:${process.env.PORT || 3000}`
	),
	themeColor: '#0c0c0c',
	title: 'Cardinal - Discord bot',
	description: 'The discord bot with all your favourite features',
	icons: ['/bot-icon.png'],
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
				<Header />
				<div className='py-2 px-8 h-fit md:py-18'>{children}</div>
				<Footer />
			</body>
		</html>
	);
}
