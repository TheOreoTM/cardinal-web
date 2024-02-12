<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import LegalSection from '$components/LegalSection.svelte';
	import { PathNames } from '$lib/constants';
</script>

<Meta title="Terms of Service" />

<main class="flex h-fit flex-col">
	<div class="flex grow flex-col lg:items-center p-7">
		<div class="flex grow flex-col gap-4">
			<h1 class="text-4xl font-bold">
				<span>Terms of Use for Cardinal Bot</span>
			</h1>
			<h2>Last updated: February 02, 2024</h2>
			<LegalSection title="1. Acceptance of Terms">
				<p>
					By using Cardinal Bot ("the Bot"), you agree to comply with and be
					bound by these Terms of Service. If you do not agree with these terms,
					please refrain from using the Bot.
				</p>
			</LegalSection>
			<LegalSection title="2. Changes to Terms">
				<p>
					Cardinal Bot reserves the right to modify or revise these Terms of
					Service at any time. Users will be notified of changes, and continued
					use of the Bot after such modifications constitutes acceptance of the
					revised terms.
				</p>
			</LegalSection>
			<LegalSection title="3. User Conduct">
				<p>
					Users must adhere to Discord's Terms of Service and Community
					Guidelines. Cardinal Bot may not be used for any unlawful or
					prohibited activity.
				</p>
			</LegalSection>
			<LegalSection title="4. Privacy">
				<p>
					Cardinal Bot respects user privacy. Data collected is solely for
					operational purposes and will not be shared with third parties. Refer
					to the <span
						><a class="anchor" href={PathNames.Privacy}>Privacy Policy</a></span
					> for more details.
				</p>
			</LegalSection>
			<LegalSection title="5. Bot Availability">
				<p>
					Cardinal Bot aims to provide continuous service, but interruptions may
					occur. The Bot is provided "as is" without any warranties, expressed
					or implied.
				</p>
			</LegalSection>
			<LegalSection title="6. Limitation of Liability">
				<p>
					Cardinal Bot and its developers are not liable for any direct,
					indirect, incidental, consequential, or special damages arising out of
					or in any way connected with the use of the Bot.
				</p>
			</LegalSection>
			<LegalSection title="7. Termination">
				<p>
					Cardinal Bot reserves the right to terminate or suspend access to the
					Bot for users who violate these Terms of Service or engage in any
					disruptive behavior.
				</p>
			</LegalSection>
			<LegalSection title="8. Governing Law">
				<p>
					These Terms of Service are governed by and construed in accordance
					with the laws of Maldives. Any disputes arising will be resolved in
					the courts of Maldives.
				</p>
			</LegalSection>
			<LegalSection title="9. Contact Information">
				<p>
					For inquiries regarding these Terms of Service, please contact
					<span>
						<a class="anchor" href="mailto:support@oreotm.xyz"
							>support@oreotm.xyz</a
						>
					</span>
				</p>
			</LegalSection>
			<LegalSection title="10. Miscellaneous">
				<p>
					These Terms of Service constitute the entire agreement between the
					user and Cardinal Bot. Any failure to enforce any provision of these
					terms does not constitute a waiver of that provision.
				</p>
			</LegalSection>
		</div>
	</div>
</main>
