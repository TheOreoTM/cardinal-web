<script lang="ts">
	import { PathNames } from '$lib/constants';

	// Base Classes
	const cBase =
		'bg-surface-50 dark:bg-surface-900 border-t border-surface-500/10 text-xs md:text-base';
	const cRowOne =
		'flex flex-col md:flex-row justify-between items-center md:items-start space-y-5 md:space-y-0';
	const cRowTwo =
		'flex flex-col md:flex-row justify-between items-center md:items-start space-y-4 md:space-y-0';

	// Social Icons
	const socialLinks = [
		{
			title: 'GitHub',
			href: 'https://github.com/theoreotm/cardinal-bot',
			icon: 'fa-github'
		},
		{ title: 'Discord', href: PathNames.Discord, icon: 'fa-discord' },
		{
			title: 'Ko-fi',
			href: 'https://ko-fi.com/theoreotm',
			icon: 'fa-dollar-sign'
		}
	];

	const externalLinks = [
		{ title: 'Ko-fi', href: PathNames.Kofi },
		{
			title: 'Status',
			href: PathNames.Status
		},
		{
			title: 'Github',
			href: PathNames.Github
		},
		{
			title: 'Support Server',
			href: PathNames.Discord
		},
		{
			title: 'Invite Bot',
			href: PathNames.Invite
		}
	];
</script>

<div class="page-footer {cBase}">
	<div class="w-full max-w-7xl mx-auto p-4 py-16 md:py-24 space-y-10">
		<!-- Row 1 -->
		<section class={cRowOne}>
			<div
				class="grid grid-cols-1 gap-2 place-content-center place-items-center md:place-items-start"
			>
				<img src="/images/logo.png" width="64" alt="logo" />
				<p class="!text-sm opacity-80">General Purpose Discord Bot.</p>
				<!-- Current Version -->
				<span class="badge variant-soft">0.0.0</span>
			</div>
			<div class="hidden md:grid grid-cols-3 gap-8">
				<div class="space-y-6">
					<h6 class="h6">Cardinal</h6>
					<ul class="space-y-3">
						<li>
							<a class="anchor" href={PathNames.Docs}>Docs</a>
						</li>
						<li><a class="anchor" href={PathNames.Commands}>Commands</a></li>
						<li><a class="anchor" href={PathNames.Premium}>Get Premium</a></li>
						<li><a class="anchor" href={PathNames.Home}>Home</a></li>
					</ul>
				</div>
				<div class="space-y-6">
					<h6 class="h6">Links</h6>
					<ul class="space-y-3">
						{#each externalLinks as { href, title }}
							<li class="group">
								<span class="relative inline-block">
									<a class="anchor" {href} target="_blank">{title}</a>
									<i
										class="absolute -top-0 -right-4 z-10 opacity-0 transition-all text-primary-500 duration-300 group-hover:opacity-100 text-xs fa-solid fa-arrow-up-right-from-square"
									/>
								</span>
							</li>
						{/each}
					</ul>
				</div>
				<div class="space-y-6">
					<h6 class="h6">Legal</h6>
					<ul class="space-y-3">
						<li>
							<a class="anchor" href={PathNames.Terms} rel="noreferrer"
								>Terms of Service</a
							>
						</li>
						<li>
							<a class="anchor" href={PathNames.Privacy} rel="noreferrer"
								>Privacy Policy</a
							>
						</li>
					</ul>
				</div>
			</div>
		</section>

		<hr class="opacity-20" />

		<!-- Row 2 -->
		<section class={cRowTwo}>
			<p>
				<span class="group relative inline-block">
					<a
						class="anchor"
						href="https://github.com/theoreotm/cardinal-bot/blob/master/LICENSE"
						target="_blank"
						rel="noreferrer"
					>
						MIT License
					</a>
					<i
						class="absolute -top-1 -right-3 z-10 opacity-0 transition-all text-primary-500 duration-300 group-hover:opacity-100 text-xs fa-solid fa-arrow-up-right-from-square"
					/>
				</span>
				<span class="opacity-10 mx-2">|</span>
				<span class="group relative inline-block">
					<a
						class="anchor"
						href="https://oreotm.xyz"
						target="_blank"
						rel="noreferrer"
					>
						Oreo Dev
					</a>
					<i
						class="absolute -top-0 -right-4 z-10 opacity-0 transition-all text-primary-500 duration-300 group-hover:opacity-100 text-xs fa-solid fa-arrow-up-right-from-square"
					/>
				</span>
			</p>
			<div class="flex gap-6">
				{#each socialLinks as sl}
					<a
						class="opacity-75 hover:opacity-100"
						href={sl.href}
						target="_blank"
						rel="noreferrer"
						title={sl.title}
					>
						<i class="fa-brands text-xl {sl.icon}" />
					</a>
				{/each}
			</div>
		</section>
	</div>
</div>
