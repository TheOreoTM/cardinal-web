<script lang="ts">
	import Meta from '$components/Meta.svelte';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		if (data.error) {
			toastStore.trigger({
				message: 'Failed to log in. Please try again.',
				hideDismiss: true,
				timeout: 8000,
				background: 'variant-filled-warning'
			});
			toastStore.trigger({
				message: `Error: ${data.error}`,
				hideDismiss: true,
				timeout: 8000,
				background: 'variant-filled-warning'
			});
		}

		if (data.message) {
			toastStore.trigger({
				message: data.message,
				timeout: 8000,
				background: 'variant-filled-primary'
			});
		}
	});

	const toastStore = getToastStore();
</script>

<Meta title="Home" />
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur quam rem ab
nulla ea ipsa odit sequi esse? Consequatur facilis dolore eveniet quae magnam voluptatibus!
Consequuntur cumque tempore libero sint! Lorem ipsum dolor sit amet consectetur adipisicing
elit. Perspiciatis debitis rem minima nostrum. Doloribus provident nihil quis eum
enim! Labore praesentium rerum exercitationem quaerat voluptatibus corporis et minima
obcaecati aliquid voluptatem, nihil tempore dolor distinctio inventore fugiat quos
eveniet consectetur, temporibus beatae! Commodi, nisi tenetur! Beatae veritatis veniam
fugit eveniet eligendi quos in dicta provident, earum corrupti deserunt distinctio
quasi impedit odio quibusdam! Mollitia eos repellat corrupti a, neque reiciendis
dicta hic quam quibusdam, quas optio? Tenetur totam eum similique soluta aspernatur
explicabo saepe? Quasi aspernatur voluptates quae corrupti vitae, minus dolore obcaecati
modi ullam aliquid fugit est possimus maiores. Lorem ipsum dolor sit amet consectetur
adipisicing elit. Accusamus a nulla, dolores quasi neque iusto perspiciatis facere
autem laudantium, saepe quidem minus, vitae molestiae nisi voluptatum consectetur.
Voluptatem eius, error deleniti fugit ducimus possimus nisi dignissimos qui dolore
excepturi perferendis odit quo dolorum perspiciatis odio rerum quia, quam, dolor
voluptates provident omnis ab suscipit! Assumenda eligendi modi doloremque vitae.
Repudiandae repellendus architecto iusto temporibus ab dicta perspiciatis dolore
numquam distinctio laborum explicabo quod deleniti id quis aliquid adipisci, dolorum
nemo officia commodi voluptate qui? Explicabo blanditiis facere itaque voluptatum
quibusdam, ab laboriosam quisquam dolores repudiandae ut at architecto atque, repellendus
a quae deserunt sunt! Necessitatibus, hic reiciendis? Asperiores ipsum mollitia recusandae.
Voluptatem enim expedita tempore, quibusdam porro facilis ratione asperiores. Fugit
quis minima harum, voluptas qui, tempora inventore delectus quaerat similique natus
corporis porro cumque pariatur sed dolorem quos. Provident in neque, nihil unde molestias
culpa odio harum sunt eius cupiditate minus mollitia sit aspernatur necessitatibus,
praesentium veritatis aliquam. Laboriosam consequatur velit aliquam dolores. Quod
facilis alias tempora accusantium voluptatibus ab voluptatum, officia sint quis vero
est totam, perferendis, eum cupiditate ipsa ut animi corporis laudantium! Veritatis
maxime soluta deserunt, autem neque cupiditate eos voluptatum doloremque! Sapiente
laborum similique recusandae dolor cumque perferendis odio dolores culpa aperiam
voluptatem quos voluptatum iure accusantium rerum ut pariatur, fugit nulla alias
consequatur explicabo ad quidem. At magnam officiis culpa corrupti rerum enim natus
reiciendis ut dolore, repellendus modi aliquam expedita veniam. Corporis quis fuga
non voluptatum quas accusantium, ea ipsa maiores autem dicta est praesentium in quos
velit facere nesciunt aspernatur repellat, error modi. Iste corporis ex modi voluptatem
excepturi mollitia corrupti repellendus aliquid totam accusantium. Quos repellendus
quibusdam ullam? Modi placeat autem aliquid odit atque similique molestiae nam rerum
reprehenderit velit facere delectus unde expedita quos, dolorum consequatur iste
est voluptatem quaerat aspernatur animi nemo deserunt. Nihil, debitis esse necessitatibus
molestiae aperiam itaque, nesciunt voluptas libero tempora amet culpa quia delectus,
repellat illum dolore pariatur. Sed suscipit laborum reprehenderit temporibus praesentium
possimus! Doloremque similique ipsa doloribus mollitia earum repellendus, debitis,
nemo error, odit velit repellat. Rem, sit cum ea quas omnis reprehenderit doloremque
iure obcaecati sequi labore esse, fugit amet fugiat veniam autem fuga pariatur a
tempore repellat quis. Sapiente saepe eius provident officia. Maiores voluptates
accusantium minus sit dolor nihil nisi quo voluptate. Placeat aperiam corporis optio
rerum ea error soluta quo assumenda delectus exercitationem odit maxime sit, at dolor
vel perferendis reiciendis, ipsam quas obcaecati deleniti magnam autem molestias
tempora accusamus? Sit id, placeat libero aliquam qui blanditiis quas, esse tempore
quis modi dicta! Autem in aliquid nisi, ab pariatur, est voluptate tempora ipsam
dolore blanditiis saepe fugit eveniet, repellendus adipisci veniam rerum! Explicabo
ipsam esse ullam consequatur saepe sapiente? Quis eum commodi veritatis ad ullam
dolorem repudiandae possimus iure reprehenderit voluptates eos sint minima, ab doloremque.
Doloremque voluptas praesentium asperiores, sapiente placeat iste, tenetur et, rem
est nesciunt ipsam! Tempora hic, numquam eligendi excepturi voluptate id a impedit
nemo autem. Sint numquam cumque perferendis accusamus necessitatibus voluptatum,
quis sapiente exercitationem sit dignissimos nihil impedit vel quos ea deserunt aut
ipsam nemo autem alias expedita reprehenderit cupiditate! Ipsam facere exercitationem
ad itaque laudantium tenetur maxime molestiae, suscipit similique veniam quae voluptas
libero cum dolores eveniet pariatur ut qui recusandae voluptatum error quas, dicta
veritatis! Quisquam facilis nemo possimus fugit qui rem iste consequatur excepturi
harum nam a amet ullam explicabo, officia impedit? Debitis est magnam provident quae
veniam sunt voluptas ut dignissimos modi dolor eligendi vero, ipsam aliquam facere
molestias itaque labore voluptates non magni harum fugiat fuga soluta? Laboriosam
harum earum eligendi voluptates quos praesentium quo at nesciunt, eius repudiandae
officiis voluptas quasi aliquam eos molestias nulla eaque perspiciatis quam dolores
sequi assumenda ut laborum? Vel ad expedita veniam assumenda error hic nihil facilis
unde, amet eum? Nihil qui magnam cupiditate modi? Labore laborum numquam quaerat
ipsam, rem, laboriosam, praesentium nisi officia in quo accusamus. Modi placeat pariatur
distinctio sequi fugiat, rerum, odit voluptatum architecto aut harum aliquid vitae
error corrupti exercitationem enim repudiandae sed, est laudantium labore. Quae reprehenderit
nobis molestiae nihil officiis quibusdam aut at, accusamus culpa, nostrum molestias
voluptatem debitis ullam incidunt ad doloremque adipisci perferendis? Quia quibusdam
magnam earum nesciunt, quaerat aliquam aliquid atque totam. Impedit corporis ducimus
hic quis molestiae. Tenetur eos quaerat nostrum blanditiis dolor! Ad distinctio,
cumque, nisi porro perspiciatis tempore modi quis magni, nesciunt velit ut quos illum
eos est animi! Non blanditiis eius magnam. Nam, tenetur. Ex facilis, eaque in ducimus
rerum omnis labore quod, nihil iusto unde dolorem excepturi porro, doloribus sequi
quisquam natus. Laborum sint magni, nihil labore unde beatae necessitatibus? Accusantium,
consectetur tempora obcaecati debitis dignissimos ipsum quisquam? Vero, aut ducimus.
Nihil dolor non iusto cumque aspernatur odit molestiae voluptatibus omnis obcaecati
consequatur, eum dolorem eligendi, iste commodi, totam accusamus architecto impedit
consequuntur error aliquid? Reprehenderit labore asperiores tenetur voluptatem non
quia aliquam porro eligendi, necessitatibus, magni ratione dignissimos blanditiis
pariatur suscipit recusandae autem nam rem cupiditate ipsa quisquam fugit vero architecto
voluptate repudiandae! Voluptate, labore ex? Dolorem non, rem temporibus nobis incidunt
distinctio quas! Voluptatem quos dolore nemo perferendis quia architecto praesentium
odit iste recusandae qui in ratione, assumenda accusantium vitae nobis. Nihil soluta
fugiat recusandae minus dicta optio mollitia pariatur earum amet libero repellendus
consectetur quas quia ullam sed nemo porro, dolorum voluptas adipisci corporis. Sapiente
laudantium id laboriosam animi, ex voluptatibus sed accusamus maxime dignissimos
et explicabo facilis dicta quasi neque recusandae. Possimus ea facere error blanditiis
unde? At molestias assumenda, animi alias quod voluptate, aut, repellendus omnis
sed optio hic. Adipisci ad exercitationem vitae molestiae, harum blanditiis ratione
facilis odit molestias architecto delectus eligendi nihil impedit. Natus et non perferendis
accusantium tempora ad excepturi! Tempora commodi autem animi exercitationem? Veritatis
ipsa voluptates provident iure omnis a assumenda maxime adipisci saepe nostrum magni
ea voluptate hic aliquam, expedita architecto in consequatur voluptas dicta tempore?
Corporis provident rerum consectetur ducimus. Fuga ab vel alias soluta quibusdam
sint, ea accusantium praesentium, eum numquam esse at sapiente velit reprehenderit
ex maxime assumenda mollitia magni, pariatur exercitationem quisquam.
