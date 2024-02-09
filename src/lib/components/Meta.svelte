<script lang="ts">
	import { MetaTags, type AdditionalRobotsProps } from 'svelte-meta-tags';

	export let title: string;
	export let guildName = '';
	export let disableTemplate = false;
	export let description = 'Imagine your favourite bot.';
	export let logo = 'https://cardinal.oreotm.xyz/images/logo.png';
	export let url = 'https://cardinal.oreotm.xyz/';
	export let blockRobots = false;

	const robotsProps: AdditionalRobotsProps = blockRobots
		? {}
		: {
				noarchive: true,
				nosnippet: true,
				notranslate: true,
				noimageindex: true,
				maxSnippet: -1,
				maxImagePreview: 'none',
				maxVideoPreview: -1
			};
</script>

<MetaTags
	title={guildName ? `${title} | ${guildName}` : title}
	titleTemplate={disableTemplate ? undefined : '%s | Cardinal Bot'}
	{description}
	canonical={url}
	openGraph={{
		type: 'website',
		url,
		title,
		description,
		images: [{ url: logo, alt: 'Cardinal icon' }],
		siteName: 'Cardinal Bot'
	}}
	twitter={{
		cardType: 'summary',
		title,
		description,
		image: logo,
		imageAlt: 'Cardinal icon'
	}}
	robots={blockRobots ? 'noindex,nofollow' : undefined}
	additionalRobotsProps={blockRobots ? undefined : robotsProps}
/>

<svelte:head>
	<meta name="theme-color" data-react-helmet="true" content="#959595" />
</svelte:head>
